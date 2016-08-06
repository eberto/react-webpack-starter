var webpack = require("webpack");
var path = require("path");

var staticPath = path.join(__dirname, "..", "static");

module.exports = {
  entry: {
    "vendor": ["react", "react-dom", "material-ui", "material-ui/RaisedButton", "material-ui/styles/MuiThemeProvider", "react-tap-event-plugin", "viperx", "bluebird", "fetch-bluebird", "lodash"]
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