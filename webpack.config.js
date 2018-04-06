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
    }
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