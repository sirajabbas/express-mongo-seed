let util = require('./index');

writeResponseMessage = (res, statusCode, status, payload, err) => {
    let msg = {
        status: status,
        code: statusCode,
        payload: payload,
        now: util.now()
    };

    if (err) {
        msg.error = JSON.stringify(err);
    }
    res.status(statusCode);
    res.json(msg);

    return;
}


exports.writeResponseMessage = writeResponseMessage;