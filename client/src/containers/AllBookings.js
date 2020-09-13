import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import confirm from "reactstrap-confirm";

import BookingUpdateModal from '../components/BookingUpdateModal';

import * as actions from '../store/actions/booking';
import { createToast } from '../hooks/toast';
import { wrappedUrl } from '../utils/urlUtils';

function AllBookings(props) {
    const userId = useSelector(state => state.user.id);
    const user = useSelector(state => state.user);
    const allBookings = useSelector(state => state.booking.allBookings);
    const [info, setInfo] = useState({ open: false });

    const dispatch = useDispatch();

    useEffect(() => {
        let id;
        if (user.isAdmin) {
            id = 123;
        } else {
            id = userId;
        }
        axios.get(wrappedUrl(`/api/bookings/${id}`))
            .then((resp) => {
                dispatch(actions.updateAllBookings([ ...resp.data ].sort(function(a, b) {
                    const timeA = new Date(a.from);
                    const timeB = new Date(b.from);
                    if (timeA.getTime() < timeB.getTime()) {
                      return -1;
                    }
                    if (timeA.getTime() > timeB.getTime()) {
                      return 1;
                    }
                    return 0;
                  })));
            })
    }, [dispatch, userId, info, user]);

    const cancelBooking = async (booking) => {
        const result = await confirm({
            title: (
                <>
                    <strong>Confirmation</strong>
                </>
            ),
            message: "Please confirm your request for booking cancellation",
            confirmText: "Confirm",
            confirmColor: "danger"
        });
        if (result) {
            axios.delete(wrappedUrl(`/api/bookings/${booking._id}`))
                .then((resp) => {
                    createToast('Booking cancelled', 'info');
                })
                .catch((err) => console.log(err));
        };
    };


    return (
        <div className="d-flex align-items-center justify-content-between" style={{marginTop:'80px'}}>
            <div className="m-auto mt-lg-0 register-div-container" style={{width: '50pc'}}>
                <span style={{ fontSize: '300%', fontWeight: 'bolder', color: 'black'}}>All Bookings</span>
            <Table striped hover>
            <thead>
                <tr>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {allBookings.map(booking => {
                    const checkin = new Date(booking.from);
                    const checckout = new Date(booking.to);
                    return (
                        <tr key={booking._id}>
                            <td onClick={() => setInfo({ open: true, details: {...booking, isAdmin: user.isAdmin} })}>{booking.roomType}</td>
                            <td onClick={() => setInfo({ open: true, details: {...booking, isAdmin: user.isAdmin} })}>{checkin.toString().slice(0, 15)}</td>
                            <td onClick={() => setInfo({ open: true, details: {...booking, isAdmin: user.isAdmin} })}>{checckout.toString().slice(0, 15)}</td>
                            <td><Button onClick={() => cancelBooking(booking)} color="danger">Cancel</Button></td>
                        </tr>
                    );
                })}
            </tbody>
            </Table>
        </div>
        {info.open ? <BookingUpdateModal details={info.details} toggle={() => setInfo({ open: false })} /> : null}
        </div>
    );
};

export default AllBookings;