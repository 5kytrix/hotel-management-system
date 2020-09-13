const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const ObjectId = mongoose.Types.ObjectId;
const BookingModel = require('../models/booking');
const RoomsModel = require('../models/rooms');
const RoomTypesModel = require('../models/roomTypes');
const { all } = require('./users');

//Check availability
router.get('/:fromDate/:toDate/:roomType/:numberOfRooms', async function(req, res, next) {
    const { fromDate, toDate, roomType, numberOfRooms } = req.params;
    const unavailableRoomIds = await BookingModel.find({
        $and: [
            {$or: [
                {$and: [{from: {$gte: new Date(Number(fromDate))}}, {from: {$lte: new Date(Number(toDate))}}]},
                {$and: [{to: {$gte: new Date(Number(fromDate))}}, {to: {$lte: new Date(Number(toDate))}}]},
                {
                    $and : [
                        {from: {$lte: new Date(Number(fromDate))}},
                        {to: {$gte: new Date(Number(toDate))}}
                    ]
                }
            ]},
            {roomType: roomType}
        ]
    }).exec();
    const allRoomIds = await RoomsModel.find({roomType: roomType}).exec();
    const availableRoomIds = allRoomIds.filter(item => !unavailableRoomIds.some(room => item._id == room.roomId));
    try {
        if (availableRoomIds.length === 0) throw 'No rooms are available';
        if (availableRoomIds.length < numberOfRooms) throw `Only ${availableRoomIds.length} rooms are available!`;
        availableRoomIds.length = numberOfRooms;
        res.send(availableRoomIds);
    } catch(err) {
        res.status(500).send(err);
    };
});

//get bookings
router.get('/:id', async function(req,res, next) {
    const { id } = req.params;
    const bookings = id != 123 ? await BookingModel.find({ userId: id }).exec() : await BookingModel.find({}).exec();
    const allBookings = [];
    await Promise.all(bookings.map(async item => {
        const { roomType } = await RoomTypesModel.findById(mongoose.Types.ObjectId(item.roomType)).exec();
        item._doc.roomType = roomType;
        allBookings.push({ ...item._doc });
    }));
    res.send(allBookings);
})

//make a booking
router.post('/', function(req, res, next) {
    const { bookings } = req.body;
    bookings.forEach(async item => {
        const booking = new BookingModel(item);
        try {
            await booking.save();
            res.send(booking);
        } catch(err) {
            console.log(err);
        }
    })
});

//update booking
router.put('/update', async function(req, res, next) {
    const { _id, roomId, roomType, from, to, guestName, guestPhoneNumber } = req.body;
    try {
        await BookingModel.updateOne({ _id: _id }, {
            roomId: roomId,
            roomType: roomType,
            from: from,
            to: to,
            guestName: guestName,
            guestPhoneNumber: guestPhoneNumber,
        }).exec();
        res.send('Success');
    } catch (err) {
        res.status(400).send(err);
    }
});

//cancel booking
router.delete('/:id', async function(req, res, next) {
    const { id } = req.params;
    try {
        await BookingModel.deleteOne({ _id: id }).exec();
        res.send('Success');
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;