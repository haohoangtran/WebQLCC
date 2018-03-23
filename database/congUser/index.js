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


module.exports = {
    createCongUser, getAllCongUser
}