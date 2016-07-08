/// <reference path="../lib/typings/index.d.ts"/>

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";

import { Greeter } from "./../src/components/greeter";

describe("Greeter", () => {

    var component: any;

    beforeEach(() => {
        component = TestUtils.renderIntoDocument(<Greeter compiler="Webpack" framework="Typescript" />);
    });

    it('Outputs correct text', () => {
        var componentDOM = ReactDOM.findDOMNode(component);
        expect(componentDOM.textContent).toMatch(/Hello from Webpack and Typescript!/);
    });
});