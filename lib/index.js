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
            server : mod.servers[key],
            client : mod.clients[key],
        };
    })
;
