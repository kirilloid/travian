var webpack = require("webpack");
var fs = require('fs');

module.exports = {
    entry: {
        app: './src/index.jsx',
        vendor: ['react', 'react-dom', 'react-router-dom'],
    },
    output: {
        filename: 'js/app.bundle.js',
        //libraryTarget: "commonjs"
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "js/vendor.bundle.js"
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
    module: {
        rules: [
            {
                test: /[.]jsx?$/,
                include: /src/,
                exclude: /[.]spec[.]jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: JSON.parse(fs.readFileSync('.babelrc', 'utf-8'))
                }
            }
        ]
    }
}