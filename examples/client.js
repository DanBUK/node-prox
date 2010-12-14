var socks5 = require('prox').socks5;

var stream = socks5.createConnection('localhost', 7890)
    .connect('substack.net', 1337);

stream.on('data', function (buf) {
    console.log(buf.toString());
});
