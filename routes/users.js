
// create another router for getting 'user' resources c
const router = require('express').Router();
// individual user routes
router.get('/', function(req, res, next) {
    res.json({ status: "success", message: "Welcome To Users Route" });
});



module.exports = router;
