const mongoose = require('mongoose');

const RoomTypesSchema = new mongoose.Schema({
    roomType: {
        type: String,
    },
}, { collection : 'roomTypes' });

const RoomTypes = mongoose.model("roomTypes", RoomTypesSchema);
module.exports = RoomTypes;