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
let getAllCongUserByMonth = (month = "", callback) => {
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
let getAllCongUser = (callback) => {
    CongUser.find({}).populate("user").sort({day: 'asc'}).exec(function (err, docs) {
        callback(
            err, handleCong(docs)
        )
    });
};
let getCong = (month, callback) => {
    let regex = new RegExp(month, "i")
        , query = {month: regex};
    CongUser.find(query).exec(function (err1, cong1) {
        CongUser.find({query}).exec(function (err2, cong12) {
            console.log(err1, err2)
            callback(err1 || err2 || null, cong1.length + cong12.length / 2);
        });
    });
};
let handleCong = (congs) => {
    let obj = {};
    for (let item of congs) {
        if (obj[item.month]) {
            obj[item.month].push(item);
        } else {
            obj[item.month] = [item];
        }
    }
    let arr = Object.values(sortObject(obj));
    return arr.map((item) => {
        return {
            month: item[0].month, congThang: item
        };
    })
};
let sortObject = (o) => {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

module.exports = {
    createCongUser, getAllCongUserByMonth, getCong, getAllCongUser
}