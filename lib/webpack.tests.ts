/// <reference path="typings/index.d.ts" />

declare var require : { context: any };

var context = require.context('../tests', true, /.spec\.ts$/);
context.keys().forEach(context);