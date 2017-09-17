var webpack = require("webpack");

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
                test: /\.jsx?$/,
                include: /src/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: [
                            'transform-object-rest-spread',
                            'babel-plugin-transform-react-jsx'
                        ]
                    }
                }
            }
        ]
    }
}