import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Jumbotron } from 'reactstrap';

import Input from '../components/Input';
import ValidationText from '../models/ValidationText';
import { createToast } from '../hooks/toast';
import Background from '../images/back1.jpg';

import * as actions from '../store/actions/user';
import axios from 'axios';
import { wrappedUrl } from '../utils/urlUtils';

function UserDetails(props) {
    const name = useSelector(state => state.user.name);
    const email = useSelector(state => state.user.email);
    const [tempName, setTempName] = useState(new ValidationText(name.text));

    const dispatch = useDispatch();

    useEffect(() => {
        setTempName(new ValidationText(name.text));
    }, [name]);

    const submit = () => {
        if (tempName.isEmpty()) {
            createToast('Please enter a name');
            return;
        }
        axios.put(wrappedUrl('/api/users'), {
            name: tempName.text,
            email: email.text,
        }).then((resp) => {
            dispatch(actions.updateUserName(new ValidationText(tempName.text)));
            createToast('Details updated successfully', 'success');
        }).catch((err) => {
            createToast('Internal Server error');
        })
    }

    return (
        <div style={{ backgroundImage: `url(${Background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className="d-flex align-items-center justify-content-between" style={{marginTop:'50px'}}>
            <div className="m-auto mt-lg-0 register-div-container">
                <div className="form-register px-3 py-4">
                    <Jumbotron>
                        <span style={{ fontWeight: 'bold', color: 'black', fontSize: 'xx-large'}}>Account Details</span>
                    <Form className="form">
                        <Input label="Name" type="text" value={tempName.text} valid={tempName.isValid} error={tempName.error}
                         onChange={(name) => setTempName(new ValidationText(name))} placeholder="Name" />

                        <Input label="Email" type="email" disabled value={email.text} valid={email.isValid} error={email.error}
                         onChange={(email) => dispatch(actions.updateUserEmail(new ValidationText(email)))} placeholder="Email" />

                        <Button color="primary" onClick={submit}>Update</Button>
                    </Form>
                </Jumbotron>
                </div>
            </div>
        </div>
        </div>
    );
};

export default UserDetails;