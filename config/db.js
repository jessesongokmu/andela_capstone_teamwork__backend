
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const db = new Pool({
    connectionString: process.env.DATABASE_URL
});

// db.on('connect', () => {
//     console.log('connected to the db');
// });

module.exports = db ;
