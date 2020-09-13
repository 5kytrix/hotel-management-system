const express = require('express');
const router = express.Router();
const RoomTypesModel = require('../models/roomTypes');
const RoomsModel = require('../models/rooms');

router.get('/types', async function(req, res, next) {
    const allRoomTypes = await RoomTypesModel.find({});
    res.json(allRoomTypes);
});

router.get('/', async function(req, res, next) {
    const allRooms = await RoomsModel.find({});
    res.json(allRooms);
});

router.post('/', async function(req, res, next) {
    console.log(req.body);
    const room = new RoomsModel(req.body);
    try {
        await room.save()
        res.json(room);
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    };
});

module.exports = router;