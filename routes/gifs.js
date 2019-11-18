const express = require('express');
const router = express.Router();
// import auth middleware
// const Auth = require('../middlewares/auth');
// import multer middleware
const gifUploads = require('../middlewares/multer-config');
// Import Controllers
const gifController = require('../controllers/gifController');

// individual user routes
// router.post('/create', Auth, gifUploads, gifController.createGif);
router.post('/create',  gifUploads, gifController.createGif);
router.get('/all', gifController.getAllGifs);
router.put('/update/{id}', gifController.updateGif);
router.delete('/delete/{id}', gifController.deleteGif);

module.exports = router;
