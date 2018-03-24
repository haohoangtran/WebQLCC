const {login, register, getAllUser} = require('../../database/user/index');
const {getToken, verifyToken} = require('../../utils');
const router = require('express').Router();
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
router.get('/', (req, res) => {
    res.send('hihi')
});
router.post('/getCountUser', (req, res) => {
    getAllUser((err, docs) => {
        res.send(docs.length);
    })
});
module.exports = router;