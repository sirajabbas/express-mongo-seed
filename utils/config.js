mongoConnection = () => {
    switch (process.env.NODE_ENV) {
        case "development":
            return "mongodb://user:password@localhost:27017/databasename";
            break;
        case "production":
            return "mongodb://user:password@localhost:27017/productiondatabasename";
            break;
    }
};

exports.mongoConnection = mongoConnection;