'use strict';

// setup loggers
require('./lib/setup_logger')();
var logger = require('./lib/get_logger')();

const Hapi = require('hapi');


require('dotenv').config();

require('./lib/start')();

logger.log('info', 'Hi');


const server = new Hapi.Server();
server.connection({port: 3000});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello World!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.start((err) => {
    if (err) {
        throw err;
    }

    console.log('Server starting at:', server.info.uri);
});