const {Pool} = require('pg');
const dotenv = require('dotenv');

//get .env settings config
dotenv.config();


// Intialize the connection string
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

//Enable the connection
pool.on('connect', ()=>{
    console.log('connected to the db');
});

/**
 * Create User Tables
 */

const createUserTables = () => {
    const queryText =`CREATE TABLE IF NOT EXISTS
      users (
        id UUID PRIMARY KEY,
        firstName VARCHAR(128) NOT NULL,
        lastName VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        email VARCHAR(128) NOT NULL,
        gender VARCHAR(128) NOT NULL,
        jobRole VARCHAR(128) NOT NULL,
        department VARCHAR(128) NOT NULL,
        address VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

/**
 * Drop User Tables
 */
const dropUserTables = () => {
    const queryText = 'DROP TABLE IF EXISTS users';
    pool.query(queryText)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});



module.exports = {
    createUserTables,
    dropUserTables
};

require('make-runnable');
