
// create another router for getting 'user' resources
var router = require('express').Router();

// individual user routes
router.get('/', function(req, res, next) {
    res.json({ status: "success", message: "Welcome To Login Route" });
});



module.exports = router;
