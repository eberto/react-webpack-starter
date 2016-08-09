import { IState } from "viperx"
import { Todo } from "./../models/todo"

export interface IAppState extends IState {
    
    todos: Array<Todo>;
    isFetching?: boolean;
    isAdding?: boolean;
}