/// <reference path="../../lib/typings/index.d.ts" />

//import * as greeter	from './../greeter';
//import * as $ from 'jquery';

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Greeter } from "./../greeter";

//TODO: add global styles, images and fonts.

//import "./fonts/material-icons.scss";

var root_div = document.getElementById("root");
if(!root_div) {
  const root = document.createElement("div");
  root.id = "root";
  document.body.appendChild(root);
  ReactDOM.render(<Greeter compiler="TypeScript" framework="React" />, root);
}