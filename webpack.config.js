module.exports = {
    entry: {
        bundle: __dirname + "/src/js/main.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "main.js"
    },
    moudle: {
        rules: [
            {
                test: /\.js$/,
                exculde: /(node_moudles|bower_components)/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                laoder: "eslint-loader",
                enforce: "pre",
                inculde: [path.resolve(__dirname, "src/js/")],
                options: {
                    formatter: require("eslint-friendly-formatter")
                }
            }
        ]
    }
}