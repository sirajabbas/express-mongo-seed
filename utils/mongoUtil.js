let MongoDb = require('mongodb'),
    logger = require('./logger'),
    ObjectId = MongoDb.ObjectID,
    MongoClient = MongoDb.MongoClient,
    _db,
    config = require('./config');

module.exports = {

    /**
     * @param {function} callback*/
    connectToServer: (callback) => {
        MongoClient.connect(config.mongoConnection(),{ useNewUrlParser: true },
            callback, function (err, db) {
                if (err) {
                    logger.error(err)
                }
                else {
                    //console.log(db)
                    _db = db;
                    return callback(err);
                }
            });
    },

    db: function () {
        return _db;
    },
    isObjectId: (objid) => {
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        return checkForHexRegExp.test(objid)
    },
    ObjectId: (id) => {
        if (id)
            return ObjectId(id)
        else
            return ObjectId()
    }
};