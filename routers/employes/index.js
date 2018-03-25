const router = require('express').Router();
const {findEmployeById} = require('../../database/employe')
router.get('/edit/:id', (req, res) => {
    let id = req.params.id;
    findEmployeById(id, (err, result) => {
        res.render("editemploye", {name: result.name})
    })
});
router.get('/delete/:id', (req, res) => {
    res.send("hi")
});
module.exports = router;