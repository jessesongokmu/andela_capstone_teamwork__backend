
// create another router for getting 'article' resources
var router = require('express').Router();

// individual article routes
router.get('/', function(req, res, next) {
    res.json({ status: "success", message: "Welcome To Articles Route" });
});



module.exports = router;
