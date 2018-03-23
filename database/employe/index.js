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

module.exports = {
    createEmploye
}