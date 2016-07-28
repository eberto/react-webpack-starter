/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { IListener, IStore } from "./../../framework/store/abstractions"
import { ITodoService } from "./../../services/todos"
import { Renderer } from "./../../framework/renderer"
import { TodoApp } from "./../todoApp"
import { todoService } from "./../dependencies"

export class ViewRenderer extends Renderer {

    public constructor(store: IStore, private todoService: ITodoService, protected rootElementId: string) {
        super(store, rootElementId);
    }

    public render(): void {
        ReactDOM.render(
          <TodoApp todoService={this.todoService} />, 
          this.getRootDiv());
    }
}