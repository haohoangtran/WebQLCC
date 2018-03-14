const router = require('express').Router();

router.post('/login', (req, res) => {
    res.render("home");
})
router.get('/', (req, res) => {
    res.send("hi");
})
module.exports = router;