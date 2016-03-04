'use strict';

var logger = require('./get_logger')('default', __filename);

// all configs passed through environment
function makeServer() {
    // const server = new Hapi.Server(),
    //       PORT = process.env.PORT;

    // server.connection({port: PORT});

    // server.start((err) => {
    //     if (err) {
    //         throw err;
    //     }

    //     console.log('Server running at:', server.info.uri);
    // });

    logger.info('Make server');
}

module.exports = makeServer;