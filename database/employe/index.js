const Employe = require('./employeSchema');

let createEmploye = (id, name, department, callback) => {
    let employe = new Employe({id, name, department});
    employe.save(err => {
        if (err)
            callback(err, null);
        else
            callback(null, employe)
    });
};
let getAllEmploye = (callback) => {
    Employe.find({}).populate('department').exec(function (err, employes) {
        let obj = {};
        for (let item of employes) {
            obj[item.id] = item;
        }

        callback(err, obj);
    });
};
let findEmployeById = (id, callback) => {
    if (+id === +id) {
        console.log("vao day")
        Employe.findOne({id: +id}).populate('department').exec((err, docs) => {
            callback(err, docs);
        })
    } else {
        console.log("vao duoi")
        Employe.findById(id).populate('department').exec((err, docs) => {
            callback(err, docs);
        })
    }
}


module.exports = {
    createEmploye, getAllEmploye, findEmployeById
}