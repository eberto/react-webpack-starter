import { IStore } from "viperx"
import * as Promise from "bluebird"
import * as FetchBluebird from "fetch-bluebird"
import { IAppState } from "./../models/state"
import { AddTodoAsyncAction, DeleteTodoAsyncAction, ToggleTodoAsyncAction, FetchTodosAsyncAction } from "./actions/todos"
import { Todo } from "./../models/todo"

export interface ITodoService {
    fetchTodos(cache?: boolean): Promise<Array<Todo>>;
    getTodos(): Array<Todo>;
    addTodo(text: string): Promise<IAppState>;
    deleteTodo(todoId: number): Promise<IAppState>;
    toggleTodo(todo: Todo): Promise<IAppState>;
}

export class TodoService implements ITodoService {

    public constructor(private store: IStore<IAppState>) {
    }

    public fetchTodos(): Promise<Array<Todo>> {
        return new Promise<Array<Todo>>((resolve: (value?: Array<Todo>) => void, reject: (errors?: any) => void) => {
            this.store.dispatchAsync(new FetchTodosAsyncAction())
            .then((state: IAppState) => resolve(state.todos))
            .catch((errors?: any) => reject(errors));
        });
    }

    public getTodos(): Array<Todo> {
        return this.store.getState<IAppState>().todos;
    }

    public addTodo(text: string): Promise<IAppState> {
        return <Promise<IAppState>>this.store.dispatchAsync((state: IAppState, resolve: (state?: IAppState) => void, reject: (errors?: any) => void) => {
            var todo = new Todo(0, text, false);
            fetch("api/todos", { 
                method: "POST", 
                headers: { 
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(todo) 
            })
            .then((response: any) => response.json())
            .then((addedTodo: Todo) => {
                state.todos.push(Todo.copyFrom(addedTodo));
                resolve(state);
            })
            .catch((errors: any) => reject(errors));
        });
    }

    public deleteTodo(todoId: number): Promise<IAppState> {
        return <Promise<IAppState>>this.store.dispatchAsync(new DeleteTodoAsyncAction(todoId));
    }

    public toggleTodo(todo: Todo): Promise<IAppState> {
        return <Promise<IAppState>>this.store.dispatchAsync(new ToggleTodoAsyncAction(todo));
    }
}