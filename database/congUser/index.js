const CongUser = require('./congUserSchema');

let createCongUser = (_id, day, month, value, callback) => {
    let congUser = new CongUser(
        {
            month,
            day,
            value,
            user: _id
        }
    );
    congUser.save(err => {
        if (err)
            callback(err, null);
        else
            callback(null, employe)
    });
};

module.exports = {
    createCongUser
}