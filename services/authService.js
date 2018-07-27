let util = require('../utils')

/**
 * This methdo retuens a user data by providing email
 * @param {string}email
 * @returns {Promise<{email: string, password: string}>}
 */
getUserByEmail = async (email) => {
    //use  your db logic instead of below mocking logic
    return {email: 'demo@demo.com', password: '123456'}
}

exports.getUserByEmail = getUserByEmail;