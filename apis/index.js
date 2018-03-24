const router = require('express').Router();
const user = require('./users');
const admin = require('./admins');
router.use('/user', user);
router.use('/admin', admin);

module.exports = router;