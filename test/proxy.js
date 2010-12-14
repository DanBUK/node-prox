var socks5 = require('prox').socks5;

exports.socks5 = function (assert) {
    var port = Math.floor(10000 + Math.random() * (Math.pow(2,16) - 10000));
    var to = setTimeout(function () {
        assert.fail('Never got request');
    }, 500);
    
    var tc = setTimeout(function () {
        assert.fail('Never connected');
    }, 500);
     
    socks5.createServer(function (err, req, stream) {
        assert.eql(req.host, 'moo');
        assert.eql(req.port, 8080);
        stream.write(new Buffer('oh hello'));
    }).listen(port, ready);
    
    function ready () {
        var stream = socks5
            .createConnection('localhost', port)
            .connect('moo', 8080)
        ;
        
        stream.on('connect', function () {
            clearTimeout(tc);
        });
        
        stream.on('error', function (msg) {
            assert.fail(msg);
        });
        
        stream.on('data', function (buf) {
            assert.eql(buf, new Buffer('oh hello'));
        });
        
        stream.on('end', function () {
            clearTimeout(to);
        });
    }
};
