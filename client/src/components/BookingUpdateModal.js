
import React, { useState, useEffect } from 'react';
import {
    Button, ModalHeader, ModalBody, Modal, ModalFooter,
} from 'reactstrap';
import axios from 'axios';

import Input from './Input';
import DatePick from './DatePick.js';
import Select from './Select';
import { createToast } from '../hooks/toast';
import { wrappedUrl } from '../utils/urlUtils';

const FormModal = (props) => {
    const { details } = props;
    const [booking, setBooking] = useState(details);
    const [oldData, setOldData] = useState({ from: new Date(details.from), to: new Date(details.to) });
    const [error, setError] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [roomType, setRoomType] = useState();

    useEffect(() => {
        axios.get(wrappedUrl('/api/rooms/types'))
            .then(resp => {
                const typeList = resp.data.map((type) => ({name: type.roomType, value: type._id}));
                setRooms([ ...typeList ]);
                const room = typeList.find(item => item.name === booking.roomType);
                setRoomType(room.value);
                setOldData({ ...oldData, roomType: room.value });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async () => {
        //validation
        const errors = [];
        let status = false;
        if (!booking.guestName) {
            errors.push("Please enter guest name");
            status = true;
        };
        if (!booking.guestPhoneNumber) {
            errors.push("Please enter guest phone number");
            status = true;
        };
        if (new Date(booking.from) > new Date(booking.to)) {
            errors.push("Checkin date should be less than checkout date");
            status = true;
        };
        if(status) {
            setError(errors.map(item => { return(
                <li>
                    {item}
                </li>
            )}));
            return;
        };
        //availability check
        const fromDate = new Date(booking.from);
        const toDate = new Date(booking.to);
        if (oldData.from.getTime() === fromDate.getTime() && oldData.to.getTime() === toDate.getTime() && oldData.roomType === roomType) {
            axios.put(wrappedUrl('/api/bookings/update'), { ...booking, roomType: roomType })
                .then(resp => {
                    createToast('Update successfull', 'success');
                    props.toggle();
                })
        } else {
            const numberOfRooms = 1;
            axios.get(wrappedUrl(`/api/api/bookings/${fromDate.getTime()}/${toDate.getTime()}/${roomType}/${numberOfRooms}`))
                .then(resp => {
                    axios.put(wrappedUrl('/bookings/update'), { ...booking, roomId: resp.data[0], roomType: roomType })
                        .then(resp => {
                            createToast('Update successfull', 'success');
                            props.toggle();
                        })
                })
                .catch(err => {
                    errors.push(err.response.data);
                    setError(errors.map(item => { 
                    return(
                        <li>
                            {item}
                        </li>
                    )}));
                });
        }
        //update
    };

    return (
        <Modal isOpen>
            <ModalHeader>
                Update Booking
            </ModalHeader>
            <ModalBody>
                <>
                {error ? <div className="alert alert-danger">{error}</div> : null}
                <Input label="Guest Name" type="text" value={booking.guestName} valid
                 onChange={(name) => setBooking({ ...booking, guestName: name })} placeholder="Name" />

                <Input label="Guest Mobile number" type="text" value={booking.guestPhoneNumber} valid
                 onChange={(phone) => setBooking({ ...booking, guestPhoneNumber: phone })} placeholder="Mobile Number" />

                <div className="d-flex justify-content-sm-between">
                <DatePick label="Check-in Date" current={new Date(booking.from)} change={date => setBooking({ ...booking, from: date.getTime()})} />
                <DatePick label="Check-out Date" current={new Date(booking.to)} change={date => setBooking({ ...booking, to: date.getTime()})} />
                </div>
                <Select current={roomType} label="Room" options={rooms || []} change={val => setRoomType(val)} />
                </>
            </ModalBody>
            <ModalFooter>
                <Button name="Cancel" onClick={props.toggle} color="info">
                    Cancel
                </Button>
                {!details.isAdmin ? <Button onClick={onSubmit} color="success">Update</Button> : null}
            </ModalFooter>
        </Modal>
    );
};

export default FormModal;
