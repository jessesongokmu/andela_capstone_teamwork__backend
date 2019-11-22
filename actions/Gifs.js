const db = require('../config/db');

/*
Insert New User into the user database table
 */
const createGif = (id, gifname, imageurl, userid, created_at, modified_at) =>{
    const myquery = `
    INSERT INTO gifs(id, gifname, imageurl, userid, created_at, modified_at)VALUES($1,$2,$3,$4,$5,$6)RETURNING *`;
    return db.query(myquery,[id, gifname, imageurl, userid, created_at, modified_at]);
};

const getGifById = (id) =>{
    const query = `
    SELECT * FROM gifs WHERE id = $1`;
    return db.query(query,[id]);
};
//verify if Gif belongs to user
const verifyGifById = (id,userID) =>{
    const query = `
    SELECT * FROM gifs WHERE id = $1AND userid= $2`;
    return db.query(query,[id,userID]);
};

//Delete specified GIF by id
const deleteGifById = (id,userID)=>{
    const dquery = `
        DELETE FROM gifs WHERE id = $1 AND userid= $2`;
    return db.query(dquery,[id,userID]);
};

module.exports ={
    createGif,
    getGifById,
    deleteGifById,
    verifyGifById
};
