const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    // devtool: 'inline-source-map',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'js'),
    },
    optimization: {
        splitChunks: {},
    },
    resolve: {
        extensions: [
            '.js', '.jsx',
            '.ts', '.tsx',
            '.json'
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /src/,
                exclude: [/\.spec\.tsx?$/, /node_modules/],
                use: 'ts-loader',
            },
            {   enforce: "pre",
                test: /\.ts$/,
                loader: "source-map-loader"
            }/*
            ,
            {
                test: /[.]jsx?$/,
                include: /src/,
                exclude: /[.]spec[.]jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: JSON.parse(fs.readFileSync('.babelrc', 'utf-8'))
                }
            }*/
        ]
    }
}
