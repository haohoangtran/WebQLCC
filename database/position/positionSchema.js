const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Position = new Schema({
    name: {
        type: String,
        require: true,
        unique: true,
        dropDups: true
    }
});

module.exports = mongoose.model('Position', Position);