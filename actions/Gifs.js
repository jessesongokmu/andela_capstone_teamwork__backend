const db = require('../config/db');

/*
Insert New User into the user database table
 */
const createGif = (id, gifname, imageurl, userid, created_at, modified_at) =>{
    const query = `
    INSERT INTO gifs(id, gifname, imageurl, userid, created_at, modified_at)VALUES($1,$2,$3,$4,$5,$6)RETURNING *`;
    return db.query(query,[id, gifname, imageurl, userid, created_at, modified_at]);
};

const getGifById = (id) =>{
    const query = `
    SELECT * FROM gifs WHERE id = $1`;
    return db.query(query,[id]);
}

module.exports ={
    createGif,
    getGifById
};
