import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import axios from 'axios';
import confirm from 'reactstrap-confirm';
import DonutChart from 'react-donut-chart';

import RoomAddModal from '../components/RoomAddModal';

import { createToast } from '../hooks/toast';
import { wrappedUrl } from '../utils/urlUtils';

function AdminSignup(props) {
    const allBookings = useSelector(state => state.booking.allBookings);
    const [floors, setFloors] = useState();
    const [rooms, setRooms] = useState();
    const [roomTypes, setAllRoomTypes] = useState();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get(wrappedUrl('/api/rooms/'))
            .then(resp => {
                setRooms(resp.data);
                axios.get(wrappedUrl('/api/floors/'))
                    .then(res => {
                        setFloors(res.data);
                        axios.get(wrappedUrl('/api/rooms/types'))
                            .then(resp => {
                                const typeList = resp.data.map((type) => ({name: type.roomType, value: type._id}));
                                setAllRoomTypes([ ...typeList ]);
                            })
                    })
            })
    }, []);

    const addFloor = async () => {
        const result = await confirm({
            title: (
                <>
                    <strong>Confirmation</strong>
                </>
            ),
            message: "Are you sure you want to add another floor ?",
            confirmText: "Confirm",
            confirmColor: "primary"
        });
        if (result) {
            axios.post(wrappedUrl('/api/floors/'), {
                level: floors[floors.length - 1].level + 1,
            }).then((resp) => {
                    setFloors([...floors, resp.data]);
                    createToast('Floor Added', 'success');
                })
                .catch((err) => console.log(err));
        };
    };

    const getBookingsByRoomType = () => {
        const map = new Map();
        allBookings.forEach(booking => {
            if (map.has(booking.roomType)) {
                map.set(booking.roomType, map.get(booking.roomType) + 1);
            } else {
                map.set(booking.roomType, 1);
            }
        });
        let data = [];
        for (let [key, value] of map) {
            data.push({
                value: value,
                label: key,
            });
        };
        return data;
    };

    const getRoomTypeDistribution = () => {
        const map = new Map();
        if (rooms && roomTypes) {
            rooms.forEach(room => {
                if (map.has(room.roomType)) {
                    map.set(room.roomType, map.get(room.roomType) + 1);
                } else {
                    map.set(room.roomType, 1);
                }
            });
            let data = [];
            for (let [key, value] of map) {
                data.push({
                    value: value,
                    label: roomTypes.find(item => item.value === key).name,
                });
            };
            return data;
        }
        return [];
    };

    const getRoomFloorDistribution = () => {
        const map = new Map();
        if (rooms && floors) {
            rooms.forEach(room => {
                if (map.has(room.level)) {
                    map.set(room.level, map.get(room.level) + 1);
                } else {
                    map.set(room.level, 1);
                }
            });
            let data = [];
            for (let [key, value] of map) {
                data.push({
                    value: value,
                    label: `Floor ${floors.find(item => item._id === key).level}`,
                });
            };
            return data;
        }
        return [];
    };

    return (
        <div className="d-flex align-items-center justify-content-between" style={{marginTop:'80px'}}>
            <div className="m-auto mt-lg-0 register-div-container" style={{width: '50pc'}}>
                <span style={{ fontSize: '300%', fontWeight: 'bolder', color: 'black'}}>Hotel Details</span>
                <div className="d-flex">
                    <div className="mt-5" style={{ fontSize: '150%', fontWeight: 'bold', color: 'gray'}}>Total Floors : {floors ? floors.length : 0}</div>
                    <Button className="mt-5 ml-5" color="primary" onClick={() => addFloor()}>Add Floor</Button>
                </div>
                <div className="d-flex">
                    <div className="mt-5" style={{ fontSize: '150%', fontWeight: 'bold', color: 'gray'}}>Total Rooms : {rooms ? rooms.length : 0}</div>
                    <Button className="mt-5 ml-5" color="primary" onClick={() => setOpen(true)}>Add Room</Button>
                </div>
                <div className="mt-5">
                    <div className="d-flex">
                        <div>
                            <div>
                            <DonutChart height={250} width={350} data={getBookingsByRoomType()}/>
                            </div>
                            <strong>Booking by Room Type</strong>
                        </div>
                        <div>
                            <div>
                            <DonutChart height={250} width={350} data={getRoomTypeDistribution()}/>
                            </div>
                            <strong>Room Type Distribution</strong>
                        </div>
                    </div>
                    <div className="mt-5">
                    <DonutChart height={250} width={350} data={getRoomFloorDistribution()}/>
                    <strong>Room - Floor distribution</strong>
                    </div>
                </div>
            </div>
            {open ? <RoomAddModal details={{floors, rooms}} toggle={() => setOpen(false)} update={(data) => setRooms([ ...rooms, data])}/> : null}
        </div>
    );
}

export default AdminSignup; 