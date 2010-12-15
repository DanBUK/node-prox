prox
====

Network proxy server and client module.

Examples
========

server.js
---------
    var socks5 = require('prox').socks5;
    socks5.createServer(function (req, res) {
        res.write('Requested ' + req.host + ':' + req.port);
    }).listen(7890)

client.js
---------
    var socks5 = require('prox').socks5;

    var stream = socks5.createConnection('localhost', 7890)
        .connect('substack.net', 1337);

    stream.on('data', function (buf) {
        console.log(buf.toString());
    });

output
------
    $ node server.js &
    [1] 32058
    $ node client.js 
    Requested substack.net:1337
