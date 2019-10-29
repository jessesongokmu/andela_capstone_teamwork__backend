const  Express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan')
const compression = require("compression");
const cors = require('cors')
const helmet = require('helmet')

require('dotenv').config()

// instiantiate express
const app = Express()


// log requests to console for development
app.use(logger('dev'))

// Use the compression of requests
app.use(compression());

// protect app with cors
app.use(cors())

// Armoring the API with Helmet
app.use(helmet());

//body parser
app.use(bodyParser.urlencoded({ extended: true}))

// parse application/json
app.use(bodyParser.json());

const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};

app.get('/', (req, res) => {
    res.status(200).end()
})


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


module.exports = app
