const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    username: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        dropDups: true
    },
    password: {
        type: String,
    },
    dateCreate: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('User', adminSchema);