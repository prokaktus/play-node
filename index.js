'use strict';

const path = require('path');
const express = require('express');
const raven = require('raven');
const hbs = require('express-handlebars');
const Immutable = require('immutable');

require('dotenv').config();
const PORT = process.env.PORT;
const PRODUCTION = process.env.PRODUCTION === 'True';
const defaultRender = Immutable.Map({production: PRODUCTION});

// setup loggers
require('./lib/setup_logger')();
const logger = require('./lib/get_logger')('default', __filename);

require('./lib/start')();

logger.log('info', 'Hi');

const app = express();

app.engine('.hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'frontend', 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'frontend', 'views', 'partials')
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'frontend', 'views'));

app.use('/static', express.static('public'));
app.get('/', function (req, res) {
    res.render('index', defaultRender);
});

app.listen(PORT, function () {
    logger.info('Start listen on port ' + PORT);
});