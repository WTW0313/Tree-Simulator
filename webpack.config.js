var path = require("path")
var webpack = require("webpack")

module.exports = {
  entry: {
    bundle: __dirname + "/src/js/main.js"
  },
  output: {
    path: __dirname + "/dist",
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader"
          }
        ],
        include: path.resolve(__dirname, "/src/js/")
      },
      {
        test: /\.js$/,
        loader: "eslint-loader",
        enforce: "pre",
        include: [path.resolve(__dirname, "/src/js/")],
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      }
    ]
  }
}