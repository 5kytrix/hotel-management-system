const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true, 
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

const User = mongoose.model("users", UserSchema);
module.exports = User;