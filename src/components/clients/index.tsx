/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import {Table} from "material-ui/Table"
import CircularProgress from "material-ui/CircularProgress"
import { Client } from "./../../models/client";
import { TodoElement } from "./../todoElement"

export interface IClientsProps {
    clients: Array<Client>;
    isFetching: boolean;
    onDelete: (todoId: number) => void;
    onToggle: (todo: Todo) => void;
}

export class Clients extends React.Component<IClientsProps, {}> {
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