var http = require('http');

module.exports = function (cb) {
    return http.createServer(function (req, res) {
        console.log(' *** req ***');
        console.dir(req);
        console.log(' *** res ***');
        console.dir(res);
        session(stream, cb);
        cb(req, res);
    });
};
