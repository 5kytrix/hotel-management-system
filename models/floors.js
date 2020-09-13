const mongoose = require('mongoose');

const FloorsSchema = new mongoose.Schema({
    level: {
        type: Number,
        unique: true,
    },
});

const Floors = mongoose.model("floors", FloorsSchema);
module.exports = Floors;