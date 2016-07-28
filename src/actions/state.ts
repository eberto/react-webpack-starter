import { IState } from "./../framework/store/abstractions"
import { Todo } from "./../models/todo"

export interface IAppState extends IState {
    
    todos: Array<Todo>;
    lastTodoId: number;
}