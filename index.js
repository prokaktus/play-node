'use strict';

// setup es6 and some other things
require("babel-register")({
    presets: ["react", "es2015"],
    extensions: ['.jsx', '.es6']
});

// setup loggers
require('./lib/setup_logger')();
const logger = require('./lib/get_logger')('default', __filename);


const path = require('path');
const express = require('express');
const raven = require('raven');
const hbs = require('express-handlebars');
const Immutable = require('immutable');
const mongoose = require('mongoose');

require('dotenv').config();
const PORT = process.env.PORT;
const PRODUCTION = process.env.PRODUCTION === 'True';
const defaultRender = Immutable.Map({production: PRODUCTION});

// setup mongodb
mongoose.connect(process.env.MONGO_URL);

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

// routers. Modules writtern in es6, that's why used default attribute
app.use('/posts', require('./server/routes/post.router').default);

app.listen(PORT, function () {
    logger.info('Start listen on port ' + PORT);
});