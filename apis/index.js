const router = require('express').Router();
const user = require('./admins');
const admin = require('./employes');
router.use('/user', user);
router.use('/admins', admin);

module.exports = router;