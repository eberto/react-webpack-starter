// /// <reference path="../../../lib/typings/index.d.ts" />

// import * as React from "react";
// import Paper from "material-ui/Paper"

// import { ITodoService } from "./../../services/todos"
// import { Todo } from "./../../models/todo";
// import { Header } from "./../header"
// import { Todos } from "./../todos"

// export interface ITodoAppProps {
//     todoService: ITodoService;
// }

// export interface ITodoAppState {
//     todos: Array<Todo>;
// }

// export class TodoApp extends React.Component<ITodoAppProps, ITodoAppState> {
    
//     constructor() {
//         super();
//         this.state = { todos: [] };
//     }

//     componentDidMount() {
//         this.props.todoService.fetchTodos().then((todos: Array<Todo>) => {
//             this.setState({ todos: todos });
//         });
//     }
    
//     render() {
//         var todoService = this.props.todoService;
//         var style = { width: "422px", padding: "10px", marginLeft: "auto", marginRight: "auto", marginTop: "80px" }
//         return (
//             <Paper style={style} zDepth={3}>
//                 <Header style={{ marginBottom: "40px" }} onAddTodo={todoService.addTodo.bind(todoService)} isAdding={todoService.isAdding()}/>
//                 <Todos todos={todoService.getTodos()} onDelete={todoService.deleteTodo.bind(todoService)} onToggle={todoService.toggleTodo.bind(todoService)} isFetching={todoService.isFetching()} />
//             </Paper>
//         );
//     }
// }