import { IStore } from "./../framework/store/abstractions"
import { IAppState } from "./../actions/state"
import { AddTodoAsyncAction, DeleteTodoAsyncAction } from "./../actions"
import { Todo } from "./../models/todo"

export interface ITodoService {
    getTodos(): Array<Todo>;
    addTodo(text: string): void;
    deleteTodo(todoId: number): void;
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
}