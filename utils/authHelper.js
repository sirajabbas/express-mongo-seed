let util = require('./')

authorizeRequest = async (req, res, next) => {
    /**
     * Get auth token from request
     * validate token
     * If valid call next()
     * if invalid return 401 response
     */
    next()
}

exports.authorize = authorizeRequest;