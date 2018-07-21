module.exports = {
    entry:{
        bundle : __dirname + '/src/js/main.js' 
    },
    output:{
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:[{loader:"babel-loader"}]
            }
        ]
    }
}