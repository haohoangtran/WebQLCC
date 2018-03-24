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
    Employe.find({}, function (err, employes) {
        let obj = {};
        for (let item of employes) {
            obj[item.id] = item;
        }

        callback(err, obj);
    });
};


module.exports = {
    createEmploye, getAllEmploye
}