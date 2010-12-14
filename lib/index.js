var mod = module.exports = {
    clients : require('./clients'),
    servers : require('./servers')
};

Object.keys(mod.clients)
    .filter(function (key) {
        return mod.servers[key];
    })
    .forEach(function (key) {
        mod[key] = {
            createServer : mod.servers[key],
            createConnection : mod.clients[key],
        };
    })
;
