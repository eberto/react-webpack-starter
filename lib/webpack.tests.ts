/// <reference path="typings/index.d.ts" />

declare var require : { context: any };

var context = require.context('../tests', true, /.spec\.ts$/); //make sure you have your directory and regex test set correctly!
context.keys().forEach(context);