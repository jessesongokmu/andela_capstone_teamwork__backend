const  Express = require('express');
const bodyParser = require('body-parser')
const logger = require('morgan')
const compression = require("compression");
const cors = require('cors')
const helmet = require('helmet')

require('dotenv').config()


// server port number
const Port = process.env.PORT || 5000
const Host = process.env.HOST || '0.0.0.0'

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


app.get('/', (req, res) => {
    res.status(200).end()
})

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

app.listen(Port, Host, ()=>{
    console.log(`server is running on ${Host}: ${Port}`)
})

module.exports = app
