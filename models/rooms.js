const mongoose = require('mongoose');

const RoomsSchema = new mongoose.Schema({
    level: {
        type: String,
    },
    roomNumber: {
        type: Number,
        unique: true,
    },
    roomType: {
        type: String,
    },
});

const Rooms = mongoose.model("rooms", RoomsSchema);
module.exports = Rooms;