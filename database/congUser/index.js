const CongUser = require('./congUserSchema');

let createCongUser = (obj, callback) => {
    let congUser = new CongUser(
        obj
    );
    congUser.save(err => {
        if (err)
            callback(err, null);
        else
            callback(null, congUser)
    });
};
let getAllCongUser = (month = "", callback) => {
    if (month) {
        CongUser.find({month})
            .populate('user')
            .exec(function (err, post) {
                callback(err, post)
            });
    } else {
        CongUser.find({}, function (err, congUsers) {
            callback(err, congUsers)
        });
    }

};
let getCong = (month, callback) => {
    CongUser.find({month, value: 'x'}).exec(function (err1, cong1) {
        CongUser.find({month, value: 'x/2'}).exec(function (err2, cong12) {
            console.log(err1, err2)
            callback(err1 || err2 || null, cong1.length + cong12.length / 2);
        });
    });
};

module.exports = {
    createCongUser, getAllCongUser, getCong
}