const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
    name: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        // required: true,
        hide: true,
    },
    email: {
        type: String,
        // unique: true,
        // lowercase: true,
        // required: true,
    }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
