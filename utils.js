let crypto = require('crypto');
const SHAKEY = "hihihaha%$%!#@!";
const jwt = require('jsonwebtoken');
let md5 = data => {
    return crypto.createHash('md5').update(data).digest("hex");
}

let verifyToken = (token) => {
    try {
        let decode = jwt.verify(token, SHAKEY);
        return decode.user
    } catch (ex) {
        return null
    }
}
let getToken = (user) => {
    return jwt.sign({user}, SHAKEY);
}
module.exports = {
    md5, getToken, verifyToken
}