'use strict';

// setup loggers
require('./lib/setup_logger')();
var logger = require('./lib/get_logger')('default', __filename);

const Koa = require('koa');


require('dotenv').config();

require('./lib/start')();

logger.log('info', 'Hi');

const app = Koa();

app.listen(3000);

app.use(function *(next) {
    yield next;
});

app.use(function *() {
    this.body = 'Hello world';
});

app.on('error', function (err, ctx) {
    console.log("Aaa! Error");
});