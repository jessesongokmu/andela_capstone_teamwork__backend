const  Express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const compression = require("compression");
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')
const { cloudinaryConfig } = require('./config/cloudinary');
require('dotenv').config();

// instiantiate express
const app = Express();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // 5 requests,
})

app.use(limiter);

// log requests to console for development
app.use(logger('dev'));

// Use the compression of requests
app.use(compression());

// protect app with cors
app.use(cors());

// Armoring the API with Helmet
app.use(helmet());

//body parser
app.use(bodyParser.urlencoded({ extended: true}));

// parse application/json
app.use(bodyParser.json());

app.use('*', cloudinaryConfig);

app.get('/', (req, res) => {
    res.status(200).end();
});

// mount the router on the app
app.use('/api/v1', require('./routes'));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,PATCH,OPTIONS');
    next();
});

// erro handlers
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500 );
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;
