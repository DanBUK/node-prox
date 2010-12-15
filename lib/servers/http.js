var http = require('http');

module.exports = function (cb) {
    return http.createServer(function (req, res) {
        var m = req.headers.host.split(/:/);
        req.host = m[0];
        req.port = m[1] || 80;
        
        cb(req, res);
    });
};
