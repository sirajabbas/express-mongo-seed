let winston = require('winston');
winston.addColors({
    trace: 'magenta',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    debug: 'blue',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
});
let logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: 'error',
            filename: './logs/error.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.File({
            name:'info',
            level: 'info',
            filename: './logs/info.log',
            handleExceptions: false,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.File({
            name:'trace',
            level: 'trace',
            filename: './logs/info.log',
            handleExceptions: false,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.File({
            name:'warn',
            level: 'warn',
            filename: './logs/info.log',
            handleExceptions: false,
            json: false,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: true
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};