const db = require('../config/db');
const cloudinary = require('../config/cloudinary');
const GifActions = require('../actions/Gifs');
const uuid = require('uuid/v4');
const moment = require('moment');
// Create new gifs
const createGif =  (req,res,next) => {
    // TODO file validation
    const mfile = req.file;
    //get logged in User
    let userID = req.user;
    cloudinary.uploader.upload(mfile.path, (results,err)=>{
        if (err) {
            return  next(err);
        }
        const data = {
            id: uuid(),
            gifname: results.original_filename,
            imageurl: results.url,
            // userid: "ffb41909-955e-4aba-be3e-a4432ddb02c3",
            userid: userID,
            created_at: results.created_at,
            modified_at: moment(new Date())
        };
        const { id, gifname, imageurl,userid,created_at,modified_at } = data;
        // Insert the Params to DB
      GifActions.createGif(id, gifname, imageurl,userid,created_at,modified_at).then((result)=>{
              res.json(result.rows);
          }
      ).catch( (error)=>{
              next(error)
      }
      );

    });
};

// Get all Gifs in desc order
const getAllGifs = (req, res,next) => {
    db.query('SELECT * FROM gifs ORDER BY created_at DESC', (error, results) => {
        if (error) {
         return  next(error);
        }
        return  res.status(200).json(results.rows);
    })
};
// Get One Gifs in desc order
const getGifById = (req, res,next) => {
   let id =  req.params.id;
   GifActions.getGifById(id).then((result)=>{
       res.json(result.rows);
   }).catch((error)=>{
       next(error);
   });
};

const updateGif = [];

const deleteGif = [
    (req,res,next)=>{
        // GET Auth User
        let userID =  req.user;
        // Get GIF ID
        let id =  req.params.id;
        // Find if GIF Exists
        GifActions.verifyGifById(id,userID).then((result)=>{
           if(result.rows == 0){
             return   res.json({
                   status: "Error",
                   message: "gif does not Exist or You are not the Owner"
               })
           }else{
               //Run DB Delete Query
               GifActions.deleteGifById(id,userID).then((result,err)=>{
                   console.log(err);
                   return res.json({
                       status: "Success",
                       message: "gif post successfully deleted",
                       gifID: result.rows.id
                   });
               }).catch((error)=>{
                   next(error);
               });
           }
        }).catch((error)=>{
            next(error);
        });
    }
];

module.exports = {
    createGif,
    getAllGifs,
    getGifById,
    updateGif,
    deleteGif
};
