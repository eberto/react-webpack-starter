/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";

import { ITodoService } from "./../../services/todos"
import { Todo } from "./../../models/todo";
import { Header } from "./../header"
import { Todos } from "./../todos"

export interface ITodoAppProps {
    todoService: ITodoService;
}

export class TodoApp extends React.Component<ITodoAppProps, {}> {
    render() {
        var todoService = this.props.todoService;
        return (
            <div>
                <Header onAddTodo={todoService.addTodo.bind(todoService)} />
                <Todos todos={todoService.getTodos()} onDelete={todoService.deleteTodo.bind(todoService)} onToggle={todoService.toggleTodo.bind(todoService)} />
            </div>
        );
    }
}