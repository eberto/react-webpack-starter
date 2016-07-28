/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import { Todo } from "./../../models/todo";

export interface ITodoElementProps {
    todo: Todo;
    onDelete: (todo: Todo) => void;
}

export class TodoElement extends React.Component<ITodoElementProps, {}> {
    render() {
        return (
            <li>
                {this.props.todo.text} &nbsp;
                <span onClick={this.handleDelete.bind(this)}>[x]</span>
            </li>
        );
    }
    handleDelete() {
        this.props.onDelete(this.props.todo);
    }
}