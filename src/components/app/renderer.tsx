/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";

import { IStateNotifier } from "./../../framework/observer"
import { ITodoService } from "./../../services/todos"
import { Renderer } from "./../../framework/renderer"
import { TodoApp } from "./../todoApp"

export class ViewRenderer extends Renderer {

    public constructor(notifier: IStateNotifier, private todoService: ITodoService, protected rootElementId: string) {
        super(notifier, rootElementId);
    }

    public render(): void {
        ReactDOM.render(
          <TodoApp todoService={this.todoService} />, 
          this.getRootDiv());
    }
}