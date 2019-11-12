const express = require('express');
const router = express.Router();

// Import Controllers
const authController = require('../controllers/authentication');

// individual user routes
router.post('/create-user', authController.create_user);
router.post('/signin', authController.signin);

module.exports = router;
