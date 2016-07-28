import { IState } from "./../framework/store"
import { Todo } from "./../models/todo"

export interface IAppState extends IState {
    
    todos: Array<Todo>;
    lastTodoId: number;
}