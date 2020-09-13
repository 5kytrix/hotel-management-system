import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import DatePick from '../components/DatePick.js';
import Select from '../components/Select';
import Input from '../components/Input';

import axios from 'axios';
import * as actions from '../store/actions/booking';
import { createToast } from '../hooks/toast.js';
import { wrappedUrl } from '../utils/urlUtils';

function CheckAvailability(props) {
    const dateFrom = useSelector(state => state.booking.dateFrom);
    const dateTo = useSelector(state => state.booking.dateTo);
    const roomType = useSelector(state => state.booking.roomType);
    const numberOfGuests = useSelector(state => state.booking.numberOfGuests);
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const [roomTypes, setRoomTypes] = useState();
    const [message, setMessage] = useState({show: false});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.updateDateFrom(Date.now()));
        dispatch(actions.updateDateTo(Date.now() + 86400000));
        axios.get(wrappedUrl('/api/rooms/types'))
            .then(resp => {
                const typeList = resp.data.map((type) => ({name: type.roomType, value: type._id}));
                setRoomTypes([ ...typeList ]);
            })
    }, [dispatch]);

    const submit = () => {
        const numberOfRooms = Math.ceil(numberOfGuests / 2);
        axios.get(wrappedUrl(`/api/bookings/${dateFrom}/${dateTo}/${roomType}/${numberOfRooms}`))
            .then(resp => {
                dispatch(actions.updateRooms([...resp.data]));
                if (isLoggedIn === true) props.history.push('/booking');
                else {
                    createToast('Please login first');
                    props.history.push({
                        pathname: '/login',
                        booking: true,
                    });
                }
            })
            .catch(err => {
                setMessage({show: true, body: err.response.data});
            });
    };

    return (
        <section className="ftco-booking ftco-section ftco-no-pt ftco-no-pb">
            <Container>
                {message.show ?
                <div class="alert alert-danger" role="alert">
                    {message.body}
                </div> : null}
                <Row noGutters>
                    <Col className="col-lg-12">
                        <Form className="booking-form aside-stretch">
                            <Row>
                                <Col className="col-md d-flex py-md-4">
                                    <FormGroup className="align-self-stretch d-flex align-items-end">
                                        <div className="wrap align-self-stretch py-3 px-4">
                                            <DatePick label="Check-in Date" current={dateFrom} change={date => dispatch(actions.updateDateFrom(date.getTime()))} />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col className="col-md d-flex py-md-4">
                                    <FormGroup className="align-self-stretch d-flex align-items-end">
                                        <div className="wrap align-self-stretch py-3 px-4">
                                            <DatePick label="Check-out Date" current={dateTo} change={date => dispatch(actions.updateDateTo(date.getTime()))} />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col className="col-md d-flex py-md-4">
                                    <FormGroup className="align-self-stretch d-flex align-items-end">
                                        <div className="wrap align-self-stretch py-3 px-4">
                                            <Select current={roomType} label="Room" options={roomTypes || []} change={val => dispatch(actions.updateRoomType(val))} />
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col className="col-md d-flex py-md-4">
                                    <FormGroup className="align-self-stretch d-flex align-items-end">
                                        <div className="wrap align-self-stretch py-3 px-4">
                                            <Input label="Guests" value={numberOfGuests} valid type="number" min={1} max={8} onChange={val => dispatch(actions.updateGuests(val))}/>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col className="md d-flex">
                                    <FormGroup className='d-flex align-self-stretch'>
                                        <Button onClick={submit} className="btn btn-primary py-5 py-md-3 px-4 align-self-stretch d-block"><span>Check Availability <small>Best Price Guaranteed!</small></span></Button>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default withRouter(CheckAvailability);