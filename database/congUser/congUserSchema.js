const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const congUserSchema = {
    user: {
        type: Schema.Types.ObjectId,
        ref: "Employe"
    },
    dateCreate: {
        type: Date,
        default: Date.now
    },
    value: {
        type: String,
        default: ""
    },
    day: {
        type: Number,
        require: true
    },
    month: {
        type: String,
        require: true
    }
};

module.exports = mongoose.model('CongUser', congUserSchema);