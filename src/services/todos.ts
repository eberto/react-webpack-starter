import { IStore } from "viperx"
import { Promise } from "es6-promise"
import { IAppState } from "./state"
import { AddTodoAsyncAction, DeleteTodoAsyncAction, ToggleTodoAsyncAction } from "./actions/todos"
import { Todo } from "./../models/todo"

export interface ITodoService {
    getTodos(): Array<Todo>;
    addTodo(text: string): Promise<IAppState>;
    deleteTodo(todoId: number): Promise<IAppState>;
    toggleTodo(todo: Todo): Promise<IAppState>;
}

export class TodoService implements ITodoService {

    public constructor(private store: IStore) {
    }

    public getTodos(): Array<Todo> {
        return this.store.getState<IAppState>().todos;
    }

    public addTodo(text: string): Promise<IAppState> {
        return this.store.dispatchAsync(new AddTodoAsyncAction(text));
    }

    public deleteTodo(todoId: number): Promise<IAppState> {
        return this.store.dispatchAsync(new DeleteTodoAsyncAction(todoId));
    }

    public toggleTodo(todo: Todo): Promise<IAppState> {
        return this.store.dispatchAsync(new ToggleTodoAsyncAction(todo));
    }
}