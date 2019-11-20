const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const db = require('../config/db');
const bcrypt = require('bcrypt');
const moment = require('moment');
const Helper = require('../middlewares/auth_helper');

const { sanitizeBody, check, validationResult }= require('express-validator');

// Set the number of salts tobe used for hashing password
const saltRounds = 10;

/**
 * Create A User
 * @param {object} req
 * @param {object} res
 * @returns {object} results object
 */
// Handle User creation post
const createUser = [

// Validate what has been posted from the form
    // Validate form field is not empty.
    check('firstName', 'FirstName is required').isLength({ min: 1 }).trim(),
    check('lastName', 'LastName is required').isLength({ min: 1 }).trim(),
    check('email', 'Email is required').isEmail().isLength({ min: 1 }).trim(),
    check('password', 'Your password must be at least 5 characters').isLength({ min: 5}).trim(),
    check('confirmPassword', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),

    check('gender', 'Gender is required').isLength({ min: 4 }).trim(),
    check('jobRole', 'Job Role is required').isLength({ min: 1 }).trim(),
    check('department', 'Department is required').isLength({ min: 1 }).trim(),
    check('address', 'Address is required').isLength({ min: 1 }).trim(),

    // Sanitize (escape) the form fields.
    sanitizeBody('firstName').escape(),
    sanitizeBody('lastName').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('confirmPassword').escape(),
    sanitizeBody('gender').escape(),
    sanitizeBody('jobRole').escape(),
    sanitizeBody('department').escape(),
    sanitizeBody('address').escape(),

    // Process request after validation
    // eslint-disable-next-line no-unused-vars
    (req, res, next) => {
// Extract the validation errors from a request.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
            // check if email already exists
            const text = 'SELECT * FROM users WHERE email = $1';
            // Todo Refactor the code
            db.query(text, [req.body.email], (err,results)=>{
                // check if a blank row is returned
                if(results.rows != 0){
                    // display message
                    res.json({
                        message: "Email already in Use"
                    });
                    return;
                }

                    // process input
                    // hash the password
                    bcrypt.hash(req.body.password, saltRounds,  (err,   hash)=> {
                        const user = {
                            id: uuid(),
                            email: req.body.email,
                            password: hash,
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            gender: req.body.gender,
                            jobRole: req.body.jobRole,
                            department: req.body.department,
                            address: req.body.address,
                            created_date: moment(new Date()),
                            modified_date: moment(new Date())
                        };
                        // get individual fields
                        const {id,firstName,lastName,email,password,gender,jobRole,department,address,created_date,modified_date} = user;

                        // Parameterize the query
                        const AuthQuery = 'INSERT INTO users(id,firstName,lastName,email,password,gender,jobRole,department,address,created_date,modified_date) VALUES($1, $2, $3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *';
                        const values = [id,firstName,lastName,email,password,gender,jobRole,department,address,created_date,modified_date];

                        // Insert/Persist the values into DB
                        db.query(AuthQuery,values, (error, results,next) => {
                            if (error) {
                               //res.status(422).json({ error: error });
                                next(error);
                                return;
                            }
                            res.status(200).json({
                                status: "Success",
                                data :{
                                    message : "User account successfully created",
                                    userID : results.rows[0].id,
                                    email: results.rows[0].email
                                }

                            });
                            return;
                        })
                    });
                return;
            });
        }
];
// eslint-disable-next-line no-unused-vars
const signin = [
    // Validate what has been posted from the form
        check('email', 'Email is required').isEmail().isLength({ min: 1 }).trim(),
        check('password', 'Your password must be at least 5 characters').isLength({ min: 5}).trim(),
        // Sanitize (escape) the form fields.
        sanitizeBody('email').escape(),
        sanitizeBody('password').escape(),

     (req, res, next) => {
    // Get validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    // check if email already exists
    const text = 'SELECT * FROM users WHERE email = $1';
    db.query(text, [req.body.email]).then( (results)=>{
        if(!results.rows[0]){
            return res.status(400).send({'message': 'The credentials you provided is incorrect'});
        }
        if(!Helper.comparePassword(results.rows[0].password, req.body.password)) {
            return res.status(400).send({ 'message': 'The credentials you provided is incorrect' });
        }
        const token = jwt.sign(
            { userId: results.rows[0].id},
            process.env.SECRET,
            { expiresIn: '24h' });
        res.status(200).json({
            message: "Success",
            data: {
                userId: results.rows[0].id,
                token: token
            }
        });
        return ;
    }).catch( (err)=>{
        return res.status(400).send(err);
    });
}
]
module.exports = {
    createUser,
    signin
};
