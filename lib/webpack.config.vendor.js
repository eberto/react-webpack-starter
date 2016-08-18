var webpack = require("webpack");
var path = require("path");

var staticPath = path.join(__dirname, "..", "static");

module.exports = {
  entry: {
    "vendor": ["react", "react-dom", "react-measure", "viperx", "bluebird", "fetch-bluebird", "lodash", "date-format"]
  },

  output: {
    filename: "[name].dll.js",
    path: staticPath,
    library: "[name]_lib",
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "..", "static", "[name]-manifest.json"),
      name: "[name]_lib"
    }),
  ],
}