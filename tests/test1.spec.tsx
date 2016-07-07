/// <reference path="../lib/typings/index.d.ts"/>

import * as React from "react";

import * as TestUtils from "reactaddons";

declare var __dirname: any;

console.log("Directorio actual: " + __dirname);

/*


import TestUtils = require("./node_modules/react/lib/ReactTestUtils");  //TODO: see why it doesn't resolve module.
import { Greeter } from "./../src/components/greeter";


describe("Greeter", () => {

    var component: any;

    beforeEach(() => {
        component = TestUtils.renderIntoDocument(<Greeter compiler="Webpack" framework="Typescript" />);
    });

    it('true is true', () => {
        
        expect(component.getDOMNode().textContent).toMatch(/Hello from Webpack and Typescript!/);
    });
});

*/

describe("Lolo", () => {

    it("Lala", () => {
        console.log("bloh");
    });
});