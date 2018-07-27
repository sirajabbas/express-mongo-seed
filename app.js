let express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    compression = require('compression'),
    util = require('./utils'),
    routes = require('./routes/index'),
    helmet = require('helmet'),
    app = express(),
    cluster = require('cluster'),
    numCPUs = require('os').cpus().length;
app.use(compression());
app.use(helmet());

//comment below two lines to disable request logging
app.use(morgan('dev'));
app.use(require('morgan')('combined', {"stream": util.logger.stream}));

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));

// Use helmet to secure Express headers
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.hidePoweredBy());


app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.all('/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,OPTIONS,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization,X-Requested-With,platform');
    res.header('Version', 'ok');
    res.header('Authorized', 'true');
    next();
});
app.use('/api/', routes.api);


let http = require('http'),
    port = process.env.NODE_ENV == 'production' ? 6000 : 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */
let server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */

util.mongoUtil.connectToServer(function (err) {
    //console.log(utils.encrypt.encryptTrackId('10'))
    if (err)
        console.log(err)
    else {
        if (process.env.NODE_ENV == 'development') {
            if (cluster.isMaster) {
                //launching workers

                console.log(`Master ${process.pid} is running`);

                // Fork workers.
                // for (let i = 0; i < numCPUs; i++) {
                for (let i = 0; i < 1; i++) {
                    cluster.fork({RUN_CRON: 'true' && i === 0});
                }

                cluster.on('exit', (worker, code, signal) => {
                    console.log(`worker ${worker.process.pid} died`);
                });
            } else {
                // Workers can share any TCP connection
                // In this case it is an HTTP server
                if (process.env.RUN_CRON === 'true') {
                    //initialize cron job scripts
                }
                server.listen(port, process.env.NODE_ENV == 'development' ? '0.0.0.0' : 'localhost');

                //console.log(`Worker ${process.pid} started`);
            }
        }
        else {
            if (process.env && process.env.pm_id) {
                //running in pm2
                if (process.env.RUN_CRON !== 'true') {
                    server.listen(port, 'localhost');
                    return;
                } else {
                    console.log('master process')
                    //initialize cron job scripts
                }
            }
        }
    }
})

server.on('error', onError);
server.on('listening', onListening);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err, req, res, next);
});

// error handlers

// development error handler
// will print stacktrace
//production do not use this.

function onError(error) {
    if (error.syscall !== 'listen') {
        util.logger.log('error', error)
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}


module.exports = app;
