// Use a template string instead of an html file to avoid node/webpack path issue

var jasmineCore = require('jasmine-core');

var getCss = function() {
    var result = "";
    jasmineCore.files.cssFiles.forEach(function(filePath) {
        result += '<link rel="stylesheet" href="jasmine/' + filePath + '" />';
    });
    return result;
}

var getJs = function() {
    var result = "";
    var jsFiles = jasmineCore.files.jsFiles.concat(jasmineCore.files.bootFiles);
    jsFiles.forEach(function(filePath) {
        result += '<script src="jasmine/' + filePath + '"></script>';
    });
    return result;
}

var template = '<!DOCTYPE html>' +
  '<html>' +
  '<head>' +
    '<meta charset="UTF-8">' +
    '<title>Jasmine Spec Runner</title>' +
      getCss() +
  '</head>' +
  '<body>' +
    getJs() +
  '</body>' +
  '</html>';

module.exports = template;