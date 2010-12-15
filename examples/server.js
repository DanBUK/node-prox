var socks5 = require('prox').socks5;
socks5.createServer(function (req, res) {
    res.write('Requested ' + req.host + ':' + req.port);
}).listen(7890)
