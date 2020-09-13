import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Jumbotron } from 'reactstrap';
import Input from '../components/Input';
import ValidationText from '../models/ValidationText';

import * as actions from '../store/actions/booking';
import axios from 'axios';
import { createToast } from '../hooks/toast';
import { wrappedUrl } from '../utils/urlUtils';

function BookingDetails(props) {
    const guestName = useSelector(state => state.booking.guestName);
    const guestPhoneNumber = useSelector(state => state.booking.guestPhoneNumber);
    const rooms = useSelector(state => state.booking.rooms);
    const dateFrom = useSelector(state => state.booking.dateFrom);
    const dateTo = useSelector(state => state.booking.dateTo);
    const roomType = useSelector(state => state.booking.roomType);
    const userId = useSelector(state => state.user.id);

    const dispatch = useDispatch();

    const submit = () => {
        axios.post(wrappedUrl('/api/bookings'),{
            bookings: rooms.map(room => ({
                userId: userId,
                roomId: room._id,
                roomType: roomType,
                from: dateFrom,
                to: dateTo,
                guestName: guestName.text,
                guestPhoneNumber: guestPhoneNumber.text
            }))
        }).then(resp => {
            createToast('Booking successfull', 'success');
            props.history.push('/');
        })
    };

    const formValidation = () => {
        let status = true;

        if (guestName.isEmpty()) {
            const nameCopy = guestName.copy();
            nameCopy.setInvalid('Enter a name');
            dispatch(actions.updateGuestName(nameCopy));
            status = false;
        };
        if (guestPhoneNumber.isEmpty()) {
            const numberCopy = guestPhoneNumber.copy();
            numberCopy.setInvalid('Enter a Phone number');
            dispatch(actions.updateGuestName(numberCopy));
            status = false;
        };
        
        if(!status) return;

        submit();
    }

    return (
        <div className="d-flex align-items-center justify-content-between" style={{marginTop:'50px'}}>
            <div className="m-auto mt-lg-0 register-div-container">
                <div className="form-register px-3 py-4">
                    <Jumbotron>
                        <span style={{ fontWeight: 'bold', color: 'black', fontSize: 'xx-large'}}>Booking Details</span>
                    <Form className="form">
                        <Input label="Guest Name" type="text" value={guestName.text} valid={guestName.isValid} error={guestName.error}
                        onChange={(name) => dispatch(actions.updateGuestName(new ValidationText(name)))} placeholder="Name" />

                        <Input label="Guest Mobile number" type="text" value={guestPhoneNumber.text} valid={guestPhoneNumber.isValid} error={guestPhoneNumber.error}
                        onChange={(phone) => dispatch(actions.updateGuestNumber(new ValidationText(phone)))} placeholder="Mobile Number" />

                        <Button color="primary" onClick={formValidation}>Book</Button>
                    </Form>
                </Jumbotron>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;