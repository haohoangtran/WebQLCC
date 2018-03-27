const router = require('express').Router();
const user = require('./users');
const admin = require('./employes');
router.use('/user', user);
router.use('/users', admin);

module.exports = router;