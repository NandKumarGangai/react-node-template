const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
        min: 8,
        max: 1024
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('UserModel', UserModel, 'users');