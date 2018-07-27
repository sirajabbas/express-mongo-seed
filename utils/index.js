exports.mongoUtil = require('./mongoUtil')
exports.config = require('./config')
exports.logger = require('./logger')
exports.responseMessageHelper=require('./responseMessageHelper')
exports.authHelper=require('./authHelper')
exports.moment = require('moment');

exports.now = () => {
    return new Date(require('moment')().utc().format());
}
exports.uuid = () => {
    return require('uuid').v4()
}
