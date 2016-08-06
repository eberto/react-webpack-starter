/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import {List, ListItem} from "material-ui/List"
import Checkbox from "material-ui/Checkbox"
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
            <List>
                {this.props.todos.map((todo: Todo) =>
                    // <TodoElement todo={todo} key={todo.id} onDelete={this.props.onDelete} onToggle={this.props.onToggle} />
                    <ListItem key={todo.id}>
                        <Checkbox label={todo.text} labelPosition="left" defaultChecked={todo.completed} onCheck={this.props.onToggle} />
                    </ListItem>
                )}
            </List>
        );
    }
}