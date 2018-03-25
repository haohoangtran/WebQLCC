const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const employeSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: "Position"
    },
    salary: {
        type: Number,
        default: 5000000
    }
});

module.exports = mongoose.model('Employe', employeSchema);