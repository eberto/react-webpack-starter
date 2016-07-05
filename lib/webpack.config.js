var webpack = require("webpack");
var path = require("path");
var autoprefixer = require("autoprefixer");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

var base64BlobLimit = 10000;

var getUrlLoaderConfig = function(subfolder, mimetype) {
  return "url?limit=" + base64BlobLimit + "&name=/" + subfolder + "/[name].[hash].[ext]&mimetype=" + mimetype;
};

module.exports = {
  cache: true,
  debug: true,
  entry: {
    vendor: ['react', 'react-dom'],
    app: [path.resolve(__dirname + '/../components/app/index.tsx')]
  },
  output: {
    path: path.resolve(__dirname + "/../static/"),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    alias: {
      react: path.resolve('./node_modules/react')
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      chunks:["app"] //TODO: there will be more chunks.
    }),
    new WebpackMd5Hash(),
    new ManifestPlugin(),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest"
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin()
  ],
  module: {
    loaders: [
      { test: /\.tsx?$/,   loader: 'awesome-typescript-loader?jsx=react' },
      { test: /\.scss/,  loader: "style!css?sourceMap!postcss!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true" },
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
  },
  /*externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }*/
};