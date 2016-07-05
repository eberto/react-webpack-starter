import * as React from "react";
import "./styles/greeter.scss";

declare var require: any;

export interface GreeterProps {
    compiler: string;
    framework: string;
}

export class Greeter extends React.Component<GreeterProps, {}> {
    render() {
        var test2 = require("./images/test2.jpg");
        return <div className="greeter"> Hello from {this.props.compiler} and {this.props.framework}!</div>;
    }
}

/*
export function greet(name: string) {

    var puppy = require("./images/puppy.jpg");
    var test = require("./images/test.png");
    var test2 = require("./images/test2.jpg");

    return '<div class="greeter"><img src="'+ test2 +'"/> Hello' + name + '</div>';
}
*/
