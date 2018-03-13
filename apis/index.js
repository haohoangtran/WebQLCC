const {login, register} = require('../database/user');
const router = require('express').Router();
router.post('/login', (req, res) => {
    let obj = req.body;
    console.log(obj);
    login(obj.username, obj.password, (err, result) => {
        console.log(err, result);
        if (result) {
            res.send({
                status: true,
                user: result
            })
        } else {
            res.send({
                status: false,
                user: null
            })
        }
    });
});
router.post('/register', (req, res) => {
    let obj = req.body;
    console.log(obj);

    register(obj.username, obj.password, (err, result) => {
        console.log(err, result);
        if (result) {
            res.send({
                status: true,
                user: result
            })
        } else {
            res.send({
                status: false,
                user: null
            })
        }
    });
});
module.exports = router;