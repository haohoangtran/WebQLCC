const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeSchema = {
    id: {
        type: Number,
        require: true,
        unique: true,
        dropDups: true
    },
    name: {
        type: String,
        require: true
    },
    dateCreate: {
        type: Date,
        default: Date.now
    },
    department: {
        type: String,
        require: true
    },
    salary: {
        type: Number,
        default: 5000000
    }
};

module.exports = mongoose.model('Employe', employeSchema);