const bcrypt = require('bcrypt');
// import jwt from 'jsonwebtoken';
const saltRounds = 10;
const Helper = {
    /**
     * Hash Password Method
     * @param {string} password
     * @returns {string} returns hashed password
     */
    hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds))
    },
    /**
     * comparePassword
     * @param {string} hashPassword
     * @param {string} password
     * @returns {Boolean} return True or False
     */
    comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    },
};
module.exports = Helper;
