var Put = require('put');
var Binary = require('binary');

module.exports = function (stream) {
    var self = {};
    
    var auth = null;
    self.auth = function (user, pass) {
        
    };
    
    self.connect = function (addr, port) {
        var methods = new Buffer([
            0x00, // no auth
        //    0x01, // gssapi
        //    0x02, // username / password
        ]);
        
        Binary(stream)
            .tap(function () {
                Put()
                    .word8(5) // socks v5
                    .word8(methods.length)
                    .put(methods)
                    .write(stream)
                ;
            })
            .word8('ver')
            .word8('method')
            .tap(function (vars) {
                console.dir(vars);
                
                if (vars.method === 0xff) {
                    console.log('No supported methods');
                }
                else {
                    var dst = atype(
                    
                    Put()
                        .word8(5)
                        .word8(1) // connect
                        .pad(1) // reserved
                        .word8(atype)
                        .put(addrBuf)
                        .word16be(port)
                        .write(stream)
                    ;
                }
            })
        ;
    });
    
    return self;
};

module.exports.atype = atype;
function atype (addr) {
    var ipv = process.binding('net').isIp(addr);
    
    if (ipv === 0) {
        var buf = new Buffer('x' + addr);
        buf[0] = buf.length;
        return {
            code : 0x03,
            name : 'domain',
            buffer : buf,
        }
    }
    else if (ipv === 4) {
        return {
            code : 0x01,
            name : 'ipv4',
            buffer : new Buffer(addr.split('.')
                .map(function (n) { return parseInt(n, 10) })
            ),
        };
    }
    else if (ipv === 6) {
        return {
            code : 0x04,
            name : 'ipv6',
            buffer : addr.split(':').reduce(
                function (put, x) {
                    if (x === '') {
                        var zeros = 8 - addr.split(':').length + 1;
                        for (var i = 0; i < zeros; i++) put = put.word16be(0);
                        return put;
                    }
                    else return put.word16be(parseInt(x, 16))
                },
                Put()
            ).buffer(),
        };
    }
    else {
        throw new Error('IP version not supported');
    }
}
