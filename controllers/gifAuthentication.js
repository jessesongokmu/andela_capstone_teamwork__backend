const db = require('../config/db');

// Create new gifs
const createGif = [];

// Get all Gifs in desc order
const getAllGifs = (req, res,next) => {
    db.query('SELECT * FROM gifs ORDER BY created_at DESC', (error, results) => {
        if (error) {
         return  next(error);
        }
        return  res.status(200).json(results.rows);
    })
};

const updateGif = [];
const deleteGif = [];

module.exports = {
    createGif,
    getAllGifs,
    updateGif,
    deleteGif
};
