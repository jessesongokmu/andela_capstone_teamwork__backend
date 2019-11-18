const express = require('express');
const router = express.Router();
const gifUploads = require('../middlewares/multer-config');
// Import Controllers
const gifController = require('../controllers/gifAuthentication');

// individual user routes
router.post('/create', gifUploads, gifController.createGif);
router.get('/all', gifController.getAllGifs);
router.put('/update/{id}', gifController.updateGif);
router.delete('/delete/{id}', gifController.deleteGif);

module.exports = router;
