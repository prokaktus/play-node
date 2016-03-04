'use strict';

// setup loggers
require('./lib/setup_logger')();
const logger = require('./lib/get_logger')('default', __filename);
const raven = require('raven');
const express = require('express');


require('dotenv').config();

require('./lib/start')();

logger.log('info', 'Hi');

const app = express();
const port = process.env.PORT;

app.get('/', function (req, res) {
    res.send('Hello world!');
})

app.listen(port, function () {
    logger.info('Start listen on port ' + port);
});