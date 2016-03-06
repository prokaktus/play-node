const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

require('dotenv').config();

const PRODUCTION = process.env.PRODUCTION === 'True';
const ENTRY = path.join(__dirname, 'frontend', 'app.js');
const FRONTEND_BUILD = path.join(__dirname, 'public');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: [
            'webpack-dev-server/client?http://0.0.0.0:3001',
            'webpack/hot/only-dev-server',
            ENTRY
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: FRONTEND_BUILD,
        publicPath: '/static/'
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.css$/, loader: "style-loader!css-loader!postcss-loader" }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    postcss: function() {
        return [autoprefixer, precss];
    },
    devServer: {
        host: '0.0.0.0',
        port: 3001,
        proxy: {
            '/api/*': 'http://localhost:3000'
        }
    }
};