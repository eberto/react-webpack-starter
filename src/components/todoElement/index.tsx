/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import { Todo } from "./../../models/todo";

export interface ITodoElementProps {
    todo: Todo;
    onDelete: (todoId: number) => void;
    onToggle: (todo: Todo) => void;
}

export class TodoElement extends React.Component<ITodoElementProps, {}> {
    render() {
        var cursorStyle = { cursor : "pointer" };
        var style: any = this.props.todo.completed? { textDecoration: "line-through" } : {};
        style.cursor = "pointer";
        return (
            <li>
                <span style={style} onClick={this.handleToggle.bind(this)}>{this.props.todo.text}</span> &nbsp;
                <span style={cursorStyle} onClick={this.handleDelete.bind(this)}>[x]</span>
            </li>
        );
    }
    handleDelete() {
        this.props.onDelete(this.props.todo.id);
    }
    handleToggle() {
        this.props.onToggle(this.props.todo);
    }
}