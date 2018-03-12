const user=require('../database/user');
const router = require('express').Router();
router.post('/', (req, res) => {
    console.log('ccqq')
    res.render('home');
});


module.exports = router;
