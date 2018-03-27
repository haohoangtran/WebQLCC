const Employe = require('./employeSchema');

let createEmploye = (id = null, name, department, salary, callback) => {

    let employe = new Employe({id, name, department, salary});
    employe.save(err => {
        if (err)
            callback(err, null);
        else
            callback(null, employe)
    });


};
let deleteEmploye = (id, callback) => {
    Employe.remove({id: +id}, function (err) {
        callback(err)
    });
}
let getLastId = (callback) => {
    Employe.find({}).sort({id: 'desc'}).exec(function (err, docs) {
        callback(
            err, docs[0].id + 1
        )
    });
}
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
        Employe.findOne({id: +id}).populate('department').exec((err, docs) => {
            callback(err, docs);
        })
    } else {
        Employe.findById(id).populate('department').exec((err, docs) => {
            callback(err, docs);
        })
    }
}


module.exports = {
    createEmploye, getAllEmploye, findEmployeById, getLastId, deleteEmploye
}