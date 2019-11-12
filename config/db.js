
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const dbConnect = new Pool({
    connectionString: process.env.DATABASE_URL
});

dbConnect.on('connect', () => {
    console.log('connected to the db');
});

module.exports = dbConnect ;
