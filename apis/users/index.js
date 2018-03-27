const {login, register, getAllUser, getPasswordById, updatePassword} = require('../../database/user/index');
const {getToken, verifyToken, md5} = require('../../utils');
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
            });
        } else {
            res.send({
                status: false,
                user: null
            })
        }
    });
});
router.post('/checkpassword', (req, res) => {
    let obj = req.body;
    let oldpass = obj.oldPass;
    let user = verifyToken(obj.token);

    getPasswordById(user._id, (err, result) => {
        console.log(oldpass, result)
        if (md5(oldpass) === result) {
            res.send({
                status: true,
                err: err
            })
        } else {
            res.send({
                status: false,
                err: err
            })
        }
    })
});
router.post('/changePassword', (req, res) => {
    let obj = req.body;
    let user = verifyToken(obj.user);
    let oldpass = obj.oldpass;
    let newpass = obj.newpass;
    let renewpass = obj.renewpass;
    console.log("obj", obj)
    getPasswordById(user._id, (err, result) => {
        console.log("result", result)
        if (result) {
            if (md5(oldpass) === result) {
                updatePassword(user._id, newpass, (err, result) => {
                    if (err) {
                        res.send({
                            status: false,
                            err: err
                        })
                    } else {
                        res.status(307).redirect('/');
                    }
                })
            } else {
                res.send({
                    status: false,
                    err: err
                })
            }
        } else {
            res.send({
                status: false,
                err: err
            })
        }
    })
});

router.post('/getCountUser', (req, res) => {
    getAllUser((err, docs) => {
        res.send(docs.length);
    })
});
module.exports = router;