/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react"
import {ListItem} from "material-ui/List"
import IconButton from "material-ui/IconButton"
import Delete from "material-ui/svg-icons/action/delete"
import Done from "material-ui/svg-icons/action/done"
import CircularProgress from "material-ui/CircularProgress"
import { Todo } from "./../../models/todo"

export interface ITodoElementProps {
    todo: Todo;
    onDelete: (todoId: number) => void;
    onToggle: (todo: Todo) => void;
}

export class TodoElement extends React.Component<ITodoElementProps, {}> {
    render() {
        var todo = this.props.todo;
        var doneTooltip = todo.completed? "Click to complete." : "Click to uncomplete.";
        var doneIconStyle = {
            color: todo.completed? "green" : "gray",
            width: todo.completed? "27px" : "19px",
            height: todo.completed? "27px" : "19px",
            marginTop: todo.completed? "-4px" : "0"
        };
        var textStyle = {
            color: todo.completed? "gray" : "black",
            textDecoration: todo.completed? "line-through" : "none",
            float: "left",
            marginTop: "3px"
        };
        var iconButtonStyle = { 
            float: "right",
            width: "28px", 
            height: "28px", 
            padding: "0" 
        };
        var deleteIconStyle = {
            color: "gray", 
            width: "19px", 
            height: "19px"
        };
        var progressStyle = {
            float: "right", 
            width: "25px", 
            height: "25px"
        };
        var progressInnerStyle = {
            marginTop: "-11px", 
            marginLeft: "-11px"
        };
        return (
            <ListItem key={todo.id} style={{width:"100%",overflow: "hidden"}}>
                <div style={textStyle}>{todo.text}</div>
                {todo.isDeleting? 
                    <CircularProgress style={progressStyle} innerStyle={progressInnerStyle} size={0.3}/> : 
                    <IconButton iconStyle={deleteIconStyle} style={iconButtonStyle} tooltip="Click to delete." onClick={() => this.props.onDelete(todo.id)}>
                        <Delete />
                    </IconButton>
                }
                {todo.isToggling? 
                    <CircularProgress style={progressStyle} innerStyle={progressInnerStyle} size={0.3}/> : 
                    <IconButton iconStyle={doneIconStyle} style={iconButtonStyle} tooltip={doneTooltip} onClick={() => this.props.onToggle(todo)}>
                        <Done />
                    </IconButton>
                }
            </ListItem>
        );
    }
}