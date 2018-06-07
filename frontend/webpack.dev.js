const path = require('path');
const webpack = require('webpack');

module.exports = {

    mode: 'development',

    entry: [
        'raf',
        'babel-polyfill',
        path.resolve(__dirname, 'src/index.jsx')
    ],

    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: 'app.js',
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader'
            },

            {
                test: /\.scss$/,
                use: [
                    'style-loader',

                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },

                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.json', '.jsx']
    }
};