/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import { Todo } from "./../../models/todo";
import { TodoElement } from "./../todoElement"

export interface ITodosProps {
    todos: Array<Todo>;
    onDelete: (todoId: number) => void;
    onToggle: (todo: Todo) => void;
}

export class Todos extends React.Component<ITodosProps, {}> {
    render() {
        return (
            <ul>
                {this.props.todos.map((todo: Todo) =>
                    <TodoElement todo={todo} key={todo.id} onDelete={this.props.onDelete} onToggle={this.props.onToggle} />
                )}
            </ul>
        );
    }
}