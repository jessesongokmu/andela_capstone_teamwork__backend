const db = require('../config/db');

/*
Insert New User into the user database table
 */
const createUser = (id, firstName, lastName, password, email, gender, jobRole, department, address) =>{
    const query = `
    INSERT INTO users(id,firstName,lastName,password,email,gender,jobRole,department,address)VALUES($1,$2,$3,$4,$5,$6,$7,$8)RETURNING *`;
    return db.one(query,[id,firstName,lastName,password,email,gender,jobRole,department,address])
};

// Find user by ID Query
const findUserById = (id) => {
    const  query = `
    SELECT * 
    FROM users
    WHERE id=$1`;
    return db.oneOrNone(query, [id]);
};

/*
Veriry if a user exist with a specified email
 */
const verifyUser = (email) =>{
    const query = `
    SELECT * FROM users WHERE email=$1`;
    return db.oneOrNone(query,[email]);
};
module.exports = {createUser, findUserById, verifyUser};
