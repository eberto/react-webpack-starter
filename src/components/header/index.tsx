/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom"
import { assign } from "lodash"
import RaisedButton from "material-ui/RaisedButton"
import CircularProgress from "material-ui/CircularProgress"
import TextField from "material-ui/TextField"
import { Todo } from "./../../models/todo";

export interface IHeaderProps {
    style: any;
    onAddTodo: (text: string) => void;
    isAdding?: boolean;
}

interface IHeaderState {
    newTodoText: string;
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {
    
    private input: any;

    constructor() {
        super();
        this.state = { newTodoText: "" };
    }

    render() {
        var style = assign(this.props.style, {width:"100%",overflow: "hidden", marginLeft: "19px"});
        var textFieldStyle = {
            float: "left",
            marginTop: "-9px", 
            marginRight: "10px"
        };
        var progressStyle = {
            float: "left", 
            width: "30px", 
            height: "30px",
        };
        var progressInnerStyle = {
            marginTop: "-4px", 
            marginLeft: "45px"
        };
        var buttonStyle = {
            float: "left",
            marginLeft: "5px"
        }
        console.log(this.props.isAdding);
        return (
            <div style={style}>
                <TextField style={textFieldStyle} floatingLabelText="What needs to be done?" onChange={this.handleInputChange.bind(this)} onKeyDown={this.handleKeyPress.bind(this)} value={this.state.newTodoText} disabled={this.props.isAdding}/><br />
                {this.props.isAdding? 
                    <CircularProgress style={progressStyle} innerStyle={progressInnerStyle} size={0.5}/> : 
                    <RaisedButton style={buttonStyle} primary={true} label="Add" onClick={() => { this.props.onAddTodo(this.state.newTodoText)} } />
                }
            </div>
        );
    }

    handleInputChange(event: any) {
        this.setState({newTodoText: event.target.value});
    }

    handleKeyPress(event: any) {
        if(event.keyCode === 13) {
            this.props.onAddTodo(this.state.newTodoText);
            this.setState({newTodoText: ""});
        }
    }
}