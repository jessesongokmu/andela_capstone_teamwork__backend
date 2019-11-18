const jwt = require('jsonwebtoken');
const db = require('../config/db');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(401).send({ 'message': 'Token is not provided' });
        }
        const decodedToken = jwt.verify(token,  process.env.SECRET);
        const userId = decodedToken.userId;
        const text = 'SELECT * FROM users WHERE id = $1';
        db.query(text, [userId]).then((results)=>{
            if (!results.rows[0]) {
                res.status(401).send({ 'message': 'The token you provided is invalid' });
            }
            req.user = userId;
            next();
        }).catch( (err)=>{
            next(err);
        });

    } catch(e) {
        res.status(401).json({
            error: 'Invalid request!'
        });
    }
};
