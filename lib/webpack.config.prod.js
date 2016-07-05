var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");
var autoprefixer = require("autoprefixer");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var base64BlobLimit = 10000;
var imgLoader = "img?minimize&optimizationLevel=5&progressive=true";

var getUrlLoaderConfig = function(subfolder, mimetype) {
  return "url?limit=" + base64BlobLimit + "&name=/" + subfolder + "/[name].[ext]&mimetype=" + mimetype;
};

module.exports = {
  debug: false,
  sourceMap: false,
  entry: {
    vendor: ['jquery'],
    app: [path.resolve(__dirname + '/../components/app/index.ts')]
  },
  output: {
    path: path.resolve(__dirname + "/../static/"),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false,
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      },
      mangle: {
        except: ['$super', '$', 'exports', 'require']
      },
      output: {
        comments: false
      }
    }),
    new ExtractTextPlugin("../static/bundle.css", {allChunks: false}),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.js",
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js"
    }),
    new HtmlWebpackPlugin()
  ],
  module: {
    loaders: [
      { test: /\.ts$/,   loader: 'awesome-typescript-loader' },
      { test: /\.scss/,  loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')},
      { test: /\.jpe?g/, loaders: [getUrlLoaderConfig("images", "image/jpg"), imgLoader] },
      { test: /\.png/,   loaders: [getUrlLoaderConfig("images", "image/png"), imgLoader] },
      { test: /\.gif/,   loaders: [getUrlLoaderConfig("images", "image/gif"), imgLoader] },
      { test: /\.svg/,   loaders: [getUrlLoaderConfig("images", "image/svg+xml"), imgLoader] },
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