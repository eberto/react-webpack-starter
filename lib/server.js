"use strict";
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var config = require("./webpack.config.js");
var open = require("open");
var path = require("path");

var host = "localhost";
var port = 8080;

var target_entry = "http://" + host + ":" + port + "/webpack-dev-server/index.html";

config.entry.app.unshift("webpack/hot/only-dev-server");
config.entry.app.unshift("webpack-dev-server/client?http://" + host + ":" + port + "/");

config.entry.tests.unshift("webpack/hot/only-dev-server");
config.entry.tests.unshift("webpack-dev-server/client?http://" + host + ":" + port + "/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {contentBase: path.resolve(__dirname + "/../static/"), hot: true, stats: { colors: true }, proxy: {
    "*": {
      target: "http://localhost:3000/",
      rewrite: function(req) {
        req.url = req.url.replace(/^\/api/, '');
      },
      changeOrigin: true
    }
  }});

server.listen(port, host, function(err) {
  if (err) {
    console.log(err);
  }
  console.log("Listening at " + host + ":" + port );
  console.log("Opening your system browser...");
  open(target_entry);
});