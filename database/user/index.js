const userModel = require('./userSchema');
const {md5} = require('../../utils');
let getAllUser = (callback) => {
    userModel.find({}, (err, result) => {
        callback(err, result)
    });
};

let login = (username, password, callback) => {
    password = md5(password);
    userModel.findOne({username, password}, (err, result) => {
        callback(err, result)
    })
};

let register = (username, password, canResetPass = false, callback) => {
    password = md5(password);
    let user = new userModel({username, password, canResetPass});
    user.save(err => {
        if (err) {
            console.log(err);
            callback(err, null)
        } else {
            callback(null, user)
        }
    });
};
let getPasswordById = (id, callback) => {
    userModel.findById(id, (err, doc) => {
        if (doc) {
            console.log(doc)
            callback(err, doc.password);
        } else {
            callback(err, null);
        }
    })
};
let updatePassword = (id, password, callback) => {
    userModel.findById(id, (err, result) => {
        result.password = md5(password);
        result.save(err => {
            callback(err)
        })
    })
};
let getAllAdmin = (callback) => {
    userModel.find({}, callback);
};
let findAdminById = (id, callback) => {
    userModel.findById(id).exec(callback);
}
let checkUsername = (username, callback) => {
    userModel.findOne({username}, (err, user) => {
        let status = Boolean(user);
        callback(err, status)
    })
}

module.exports = {
    getAllUser, register, login, getPasswordById, updatePassword, getAllAdmin, findAdminById, checkUsername
};