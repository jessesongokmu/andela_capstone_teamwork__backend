// create new Router instance for api routes
const router = require('express').Router();
const Users = require('./users');
const Articles = require('./articles');
const Auth = require('./auth');
const Gif = require('./gifs');

// Swagger Documentation
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// api/articles/
router.use('/users', Users);

// api/articles/
router.use('/articles', Articles);

// api/authentication/
router.use('/auth', Auth);

// api/gif/
router.use('/gifs', Gif);


module.exports = router;
