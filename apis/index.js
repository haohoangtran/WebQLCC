const {login, register} = require('../database/user');
const {getToken, verifyToken} = require('../utils');
const pages = require('./pages')
const router = require('express').Router();
router.use('/pages', pages);
router.post('/login', (req, res) => {
    let obj = req.body;
    console.log(obj);
    login(obj.username, obj.password, (err, result) => {
        console.log("login", result);
        if (result) {
            let token = getToken(result);
            req.session.token = token;
            req.session.save(err => {
                console.log("errr", err)
            });
            console.log("insert token", token)
            if (obj.type) {
                res.send({
                    status: true,
                    user: result,
                    token
                });
            } else {
                res.redirect('/')
            }



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
    console.log("req", obj);
    register(obj.username, obj.password, (err, result) => {
        if (result) {
            res.send({
                status: true,
                user: result,
                token: getToken(result)
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