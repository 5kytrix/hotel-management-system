const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    roomId: {
        type: String,
    },
    roomType: {
        type: String,
    },
    from: {
        type: Date,
    },
    to: {
        type: Date,
    },
    guestName: {
        type: String,
    },
    guestPhoneNumber: {
        type: String,
    }
});

const Booking = mongoose.model("bookings", BookingSchema);
module.exports = Booking;