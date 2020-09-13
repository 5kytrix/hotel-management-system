import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Jumbotron } from 'reactstrap';

import Input from '../components/Input';
import ValidationText from '../models/ValidationText';
import { createToast } from '../hooks/toast';
import Background from '../images/back1.jpg';

import * as actions from '../store/actions/user';
import axios from 'axios';
import { wrappedUrl } from '../utils/urlUtils';

function Signup(props) {
    const name = useSelector(state => state.user.name);
    const email = useSelector(state => state.user.email);
    const password = useSelector(state => state.user.password);
    const [tempPassword, setTempPassword] = useState(new ValidationText(''));

    const dispatch = useDispatch();

    const submit = () => {
        // const hashedPassword = encryptPassword();
        axios.post(wrappedUrl('/api/users'), {
            name: name.text,
            email: email.text,
            password: password.text,
        }).then(resp => {
            dispatch(actions.updateUserEmail(new ValidationText()));
            dispatch(actions.updateUserPassword(new ValidationText()));
            createToast('Account created successfully!', 'success');
            props.history.push('/login');
        })
          .catch(err => {
              switch(err.response.status) {
                  case 400:
                      createToast(err.response.data);
                      break;
                  default:
                      createToast('Internal Server Error');
              }
          });
    };

    const formValidation = () => {
        let status = true;
        if (name.isEmpty()) {
            const nameCopy = name.copy();
            nameCopy.setInvalid('Enter a name');
            dispatch(actions.updateUserName(nameCopy));
            status = false;
        };
        if (email.isEmpty()) {
            const emailCopy = email.copy();
            emailCopy.setInvalid('Enter a email');
            dispatch(actions.updateUserEmail(emailCopy));
            status = false;
        };
        if (password.isEmpty()) {
            const passwordCopy = password.copy();
            passwordCopy.setInvalid('Enter a password');
            dispatch(actions.updateUserPassword(passwordCopy));
            status = false;
        };
        if (password.text !== tempPassword.text) {
            const tempPasswordCopy = tempPassword.copy();
            tempPasswordCopy.setInvalid('Passwords donot match!');
            setTempPassword(tempPasswordCopy);
            status = false;
        };
        if(!status) return;
        submit();
    }

    return (
        <div style={{ backgroundImage: `url(${Background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="d-flex align-items-center justify-content-between" style={{marginTop:'50px'}}>
            <div className="m-auto mt-lg-0 register-div-container">
                <div className="form-register px-3 py-4">
                <Form className="form">
                    <Jumbotron>
                    <Input label="Name" type="text" value={name.text} valid={name.isValid} error={name.error}
                     onChange={(name) => dispatch(actions.updateUserName(new ValidationText(name)))} placeholder="Name" />

                    <Input label="Email" type="email" value={email.text} valid={email.isValid} error={email.error}
                     onChange={(email) => dispatch(actions.updateUserEmail(new ValidationText(email)))} placeholder="Email" />

                    <Input label="Password" type="password" value={password.text} valid={password.isValid} error={password.error}
                     onChange={(password) => dispatch(actions.updateUserPassword(new ValidationText(password)))} placeholder="Password" />

                    <Input label="Confirm Password" type="password" value={tempPassword.text}  valid={tempPassword.isValid} error={tempPassword.error}
                    onChange={(password) => setTempPassword(new ValidationText(password))} placeholder="Confirm Password" />

                    <Button color="primary" onClick={formValidation}>Submit</Button>
                    </Jumbotron>
                </Form>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Signup; 