let util = require('../utils'),
    services = require('../services');

login = async (req, res) => {
    try {
        let email = req.body.email,
            password = req.body.password;
        if (email == 'demo@demo.com' && password == '123456') {
            util.responseMessageHelper.writeResponseMessage(res, 200, 'ok', {
                success: true,
                token: 'generate your token using jwt or other logic'
            })
        }
        else
            util.responseMessageHelper.writeResponseMessage(res, 200, 'ok', {
                success: false,
                message: 'invalid credentials'
            })
    }
    catch (err) {
        util.logger.error(err)
        return util.responseMessageHelper.writeResponseMessage(res, 500, 'error', 'internal server error', err)
    }
}

exports.login = login;