/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import {List} from "material-ui/List"
import CircularProgress from "material-ui/CircularProgress"
import { Todo } from "./../../models/todo";
import { TodoElement } from "./../todoElement"

export interface ITodosProps {
    todos: Array<Todo>;
    isFetching: boolean;
    onDelete: (todoId: number) => void;
    onToggle: (todo: Todo) => void;
}

export class Todos extends React.Component<ITodosProps, {}> {
    render() {
        return (
            this.props.isFetching?
                <CircularProgress style={{display: "block", marginLeft: "auto", marginRight: "auto"}} size={1}/> :
                <List>
                    {this.props.todos.map((todo: Todo) => 
                        <TodoElement key={todo.id} todo={todo} onToggle={this.props.onToggle} onDelete={this.props.onDelete} />
                    )}
                </List>
        );
    }
}