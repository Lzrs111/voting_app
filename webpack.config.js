var dotenv = require("dotenv").config()
var webpack = require("webpack")

module.exports = [{
    entry: __dirname + '/front/index.js',
    output: {
        filename: 'index.js',
        path: __dirname + '/build'
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
            },
            {
            test:/\.css$/,
            use:[
                {loader:'style-loader'},
                {loader:'css-loader'}
            ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.API_KEY": JSON.stringify(process.env.API_KEY)
        })
    ]
},{
    entry: __dirname + '/back/index.js',
    output: {
        filename: 'server.js',
        path: __dirname + '/build'
    },
    module: {
        rules: [
            {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
            }
        ]
    },
    target:"node",
    node: {
        __dirname: false
    }
}]