import { IStore } from "viperx"
import { IAppState } from "./state"
import { AddTodoAsyncAction, DeleteTodoAsyncAction, ToggleTodoAsyncAction } from "./actions/todos"
import { Todo } from "./../models/todo"

export interface ITodoService {
    getTodos(): Array<Todo>;
    addTodo(text: string): void;
    deleteTodo(todoId: number): void;
    toggleTodo(todo: Todo): void;
}

export class TodoService implements ITodoService {

    public constructor(private store: IStore) {
    }

    public getTodos(): Array<Todo> {
        return this.store.getState<IAppState>().todos;
    }

    public addTodo(text: string): void {
        this.store.dispatchAsync(new AddTodoAsyncAction(text));
    }

    public deleteTodo(todoId: number): void {
        this.store.dispatchAsync(new DeleteTodoAsyncAction(todoId));
    }

    public toggleTodo(todo: Todo): void {
        this.store.dispatchAsync(new ToggleTodoAsyncAction(todo));
    }
}