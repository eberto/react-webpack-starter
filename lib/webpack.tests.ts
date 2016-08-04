import "../tests/services/todos.spec.ts";

declare var module: any;

module.hot.accept();

var root = document.getElementsByClassName("jasmine_html-reporter");

if(root.length > 0 && window.location.href.indexOf("tests.html") > 0) {
    window.location.reload();
}

