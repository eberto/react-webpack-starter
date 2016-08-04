var webpackConfig = require("./webpack.config");

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "../tests/**/*.ts",
      "../tests/**/*.tsx"      
    ],
    exclude: [
    ],
    preprocessors: {
      "../tests/**/*.ts": ["webpack"],
      "../tests/**/*.tsx": ["webpack"]
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ["spec"],
    specReporter: {
        suppressSuccess: true,
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome"],
    singleRun: true,
    concurrency: Infinity
  })
}