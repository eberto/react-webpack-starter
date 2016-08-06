/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import { assign } from "lodash"
import RaisedButton from "material-ui/RaisedButton"
import TextField from "material-ui/TextField"
import { Todo } from "./../../models/todo";

export interface IHeaderProps {
    style: any;
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
        var style = assign(this.props.style, {width:"100%",overflow: "hidden", marginLeft: "19px"});
        return (
            <div style={style}>
                <TextField style={{float: "left",marginTop: "-9px", marginRight: "10px"}} floatingLabelText="What need to be done?" onChange={this.handleInputChange.bind(this)} onKeyDown={this.handleKeyPress.bind(this)} /><br />
                <RaisedButton style={{float: "left"}} primary={true} label="Add" onClick={() => { this.props.onAddTodo(this.state.newTodoText)} } />
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