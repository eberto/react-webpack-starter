/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { ITodoService } from "./../../services/todos"
import { IStateNotifier, Renderer } from "viperx"
import { TodoApp } from "./../todoApp"

export class ViewRenderer extends Renderer {

    public constructor(notifier: IStateNotifier, private todoService: ITodoService, protected rootElementId: string) {
        super(notifier, rootElementId);
    }

    public render(): void {
        ReactDOM.render(
            <MuiThemeProvider>  
                <TodoApp todoService={this.todoService} />
            </MuiThemeProvider>, this.getRootDiv());
    }
}