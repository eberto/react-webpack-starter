/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import { Todo } from "./../../models/todo";

export interface IHeaderProps {
    onAddTodo: (text: string) => void;
}

interface IHeaderState {
    newTodoText: string;
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
    
    constructor() {
        super();
        this.state = { newTodoText: "" };
    }

    render() {
        return (
            <div>
                <input type="text" onChange={this.handleInputChange.bind(this)} onKeyDown={this.handleKeyPress.bind(this)} />
                <button onClick={() => { this.props.onAddTodo(this.state.newTodoText)} }>Add Todo</button>
            </div>
        );
    }

    handleInputChange(event: any) {
        this.setState({newTodoText: event.target.value});
    }

    handleKeyPress(event: any) {
        if(event.keyCode === 13) {
            this.props.onAddTodo(this.state.newTodoText)
        }
    }
}