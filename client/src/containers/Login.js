import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Jumbotron } from 'reactstrap';
import Input from '../components/Input';
import * as paths from '../utils/constants/paths';
import * as jwt from 'jwt-decode';
import Cookies from 'universal-cookie';
import Background from '../images/back1.jpg';

import ValidationText from '../models/ValidationText';

import * as actions from '../store/actions/user';
import axios from 'axios';
import { createToast } from '../hooks/toast';
import { wrappedUrl } from '../utils/urlUtils';

function Login(props) {
    const email = useSelector(state => state.user.email);
    const password = useSelector(state => state.user.password);

    const dispatch = useDispatch();

    const submit = () => {
        axios.post(wrappedUrl('/api/users/login'), {
            email: email.text,
            password: password.text,
        }).then((resp) => {
            const cookies = new Cookies();
            const jwtToken = resp.data.token;
            const tokenInfo = jwt(jwtToken.replace('Bearer ', ''));
            cookies.set('hms-token', jwtToken.replace('Bearer ', ''), { path: '/'});
            const { id, name, isAdmin } = tokenInfo;
            dispatch(actions.updateUserName(new ValidationText(name)));
            dispatch(actions.updateUserEmail(new ValidationText(email.text)));
            dispatch(actions.updateUserPassword(new ValidationText()));
            dispatch(actions.updateUserId(id));
            dispatch(actions.updateIsAdmin(isAdmin));
            dispatch(actions.updateUserLoggedIn(true));
            if (props.location.booking) props.history.push('/booking');
            else props.history.push('/');
        })
        .catch((err) => {
            switch(err.response.status) {
                case 400:
                    createToast(err.response.data);
                    return;
                case 401:
                    createToast(err.response.data);
                    return;
                default:
                    createToast('Internal Server Error');
            }
        })
    }

    const formValidation = () => {
        let status = true;
        if (email.isEmpty()) {
            const emailCopy = email.copy();
            emailCopy.setInvalid('Enter email');
            dispatch(actions.updateUserEmail(emailCopy));
            status = false;
        };
        if (password.isEmpty()) {
            const passwordCopy = password.copy();
            passwordCopy.setInvalid('Enter password');
            dispatch(actions.updateUserPassword(passwordCopy));
            status = false;
        };
        if (!status) return;
        submit();
    }

    return (
        <div style={{ backgroundImage: `url(${Background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="d-flex align-items-center justify-content-between" style={{marginTop:'50px'}}>
            <div className="m-auto mt-lg-0 register-div-container">
                <div className="form-register px-3 py-4">
                <Form className="form">
                    <Jumbotron>
                    <Input label="Email" type="email" value={email.text} valid={email.isValid} error={email.error}
                     onChange={(email) => dispatch(actions.updateUserEmail(new ValidationText(email)))} placeholder="Email" />

                    <Input label="Password" type="password" value={password.text} valid={password.isValid} error={password.error}
                     onChange={(password) => dispatch(actions.updateUserPassword(new ValidationText(password)))} placeholder="Password" />

                    <Button color="primary" onClick={formValidation}>Submit</Button>
                    <div className="mt-3">
                        New User ?
                        <a href={paths.SIGNUP}> Sign Up</a>
                    </div>
                    </Jumbotron>
                </Form>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Login; 