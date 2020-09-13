
import React, { useState, useEffect } from 'react';
import {
    Button, ModalHeader, ModalBody, Modal, ModalFooter,
} from 'reactstrap';
import axios from 'axios';

import Input from './Input';
import Select from './Select';
import { createToast } from '../hooks/toast';
import { wrappedUrl } from '../utils/urlUtils';

const FormModal = (props) => {
    const { details } = props;
    const [room, setRoom] = useState();
    const [roomType, setRoomType] = useState();
    const [allRooms, setAllRooms] = useState([]);
    const [floor, setFloor] = useState();
    const [allFloors, setAllFloors] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        axios.get(wrappedUrl('/api/rooms/types'))
            .then(resp => {
                const typeList = resp.data.map((type) => ({name: type.roomType, value: type._id}));
                setAllRooms([ ...typeList ]);
                setRoomType(typeList[0].value);
                const floorList = details.floors.map(type => ({ name: type.level, value: type._id}));
                setAllFloors([...floorList]);
                setFloor(floorList[0].value);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async () => {
        if (!room) {
            setError('Please enter a room number');
            return;
        };
        if (details.rooms.some(item => item.roomNumber === room)) {
            setError('Room Number already exists');
            return;
        };
        axios.post(wrappedUrl('/api/rooms/'), {
            level: floor,
            roomNumber: room,
            roomType: roomType,
        }).then(resp => {
            props.toggle();
            props.update(resp.data);
            createToast('Room added successfully!', 'success')
        });
    };

    return (
        <Modal isOpen>
            <ModalHeader>
                Add Room
            </ModalHeader>
            <ModalBody>
                <>
                {error ? <div className="alert alert-danger">{error}</div> : null}
                <Input label="Room Number" type="number" value={room} valid
                 onChange={(number) => setRoom(number)} placeholder="Room Number" />
                <Select current={roomType} label="Room Type" options={allRooms || []} change={val => setRoomType(val)} />
                <Select current={floor} label="Floor" options={allFloors || []} change={val => setFloor(val)} />
                </>
            </ModalBody>
            <ModalFooter>
                <Button name="Cancel" onClick={props.toggle} color="info">
                    Cancel
                </Button>
                <Button onClick={onSubmit} color="success">Add</Button>
            </ModalFooter>
        </Modal>
    );
};

export default FormModal;
