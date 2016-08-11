var webpack = require("webpack");
var path = require("path");
var autoprefixer = require("autoprefixer");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");
var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
var WebpackMd5Hash = require("webpack-md5-hash");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var jasmineCorePath = require('jasmine-core').files.path;
var jasmineTemplate = require('./jasmine.tpl');

var base64BlobLimit = 10000;

var getUrlLoaderConfig = function(subfolder, mimetype) {
  return "url?limit=" + base64BlobLimit + "&name=/" + subfolder + "/[name].[ext]&mimetype=" + mimetype;
};

module.exports = {
  cache: true,
  debug: true,
  entry: {
    app: [path.join(__dirname, "..", "src", "components", "app", "index.tsx")],
    tests: [path.join(__dirname, "webpack.tests.ts")]
  },
  output: {
    path: path.join(__dirname, "..", "static"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
    pathinfo: true
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: ".",
      manifest: require(path.join(__dirname, "..", "static", "vendor-manifest.json"))
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common"
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      chunks: ["common", "app"]
    }),
    new AddAssetHtmlPlugin({
      filename: require.resolve('../static/vendor.dll.js'),
      includeSourcemap: false
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(jasmineCorePath, "jasmine.css"), to: "jasmine"},
      { from: path.resolve(jasmineCorePath, "jasmine.js"), to: "jasmine"},
      { from: path.resolve(jasmineCorePath, "jasmine-html.js"), to: "jasmine"},
      { from: path.resolve(jasmineCorePath, "json2.js"), to: "jasmine"},
      { from: path.resolve(jasmineCorePath, "boot.js"), to: "jasmine"}
    ]),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ["common", "tests"],
      filename: 'tests.html',
      templateContent: jasmineTemplate
    }),
    new CleanWebpackPlugin(["static"], {
      root: path.join(__dirname, ".."),
      verbose: true, 
      dry: false,
      exclude: ["vendor.dll.js", "vendor-manifest.json", "jasmine", "fonts"]
    })
  ],
  module: {
    loaders: [
      { test: /\.tsx?$/,   loader: "react-hot!awesome-typescript-loader?jsx=react" },
      { test: /\.scss/,  loader: "style!css?sourceMap!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true" },
      { test: /\.css/,  loader: "style!css!postcss"},
      { test: /\.jpe?g/, loader: getUrlLoaderConfig("images", "image/jpg") },
      { test: /\.png/,   loader: getUrlLoaderConfig("images", "image/png") },
      { test: /\.gif/,   loader: getUrlLoaderConfig("images", "image/gif") },
      { test: /\.svg/,   loader: getUrlLoaderConfig("images", "image/svg+xml") },
      { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/,  loader: getUrlLoaderConfig("fonts", "application/font-woff") },
      { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: getUrlLoaderConfig("fonts", "application/font-woff2") },
      { test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: getUrlLoaderConfig("fonts", "application/x-font-truetype") },
      { test: /\.otf(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: getUrlLoaderConfig("fonts", "application/x-font-opentype") },
      { test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: getUrlLoaderConfig("fonts", "application/vnd.ms-fontobject") }
    ]
  },
  postcss: function() {
    return [autoprefixer];
  }
};