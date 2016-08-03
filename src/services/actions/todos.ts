/// <reference path="../../../lib/typings/index.d.ts" />
/// <reference path="../../../lib/typings/index.locals.d.ts" />

import * as Promise from "bluebird"
import * as FetchBluebird from "fetch-bluebird"
import { IAction, IAsyncAction, IState } from "viperx"
import { IAppState } from "./../state"
import { Todo } from "./../../models/todo"

export class AddTodoAction implements IAction {

    constructor(private text: string) {
        this.text = text;
    }

    public execute(state: IAppState): IState {
        state.todos.push(new Todo(100, this.text, false));
        return state;
    }
}

export class AddTodoAsyncAction implements IAsyncAction {

    constructor(private text: string) {
    }

    public execute(state: IAppState, resolve: (value?: IState) => void, reject: (errors?: any) => void = null): void {
        var todo = new Todo(0, this.text, false);
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
    }
}

export class DeleteTodoAsyncAction implements IAsyncAction {

    constructor(private todoId: number) {
    }

    public execute(state: IAppState, resolve: (value?: IState) => void, reject: (errors?: any) => void): void {
        fetch("api/todos/" + this.todoId, { 
            method: "DELETE", 
            headers: { 
                "Content-Type": "application/json"
            }
        })
        .then((response: any) => response.json())
        .then(() => {
            state.todos = state.todos.filter((t: Todo) => t.id !== this.todoId);
            resolve(state);
        })
        .catch((errors: any) => reject(errors));        
    }
}

export class ToggleTodoAsyncAction implements IAsyncAction {

    constructor(private todo: Todo) {
    }

    public execute(state: IAppState, resolve: (value?: IState) => void, reject: (errors?: any) => void): void {
        this.todo.completed = !this.todo.completed;
        fetch("api/todos/" + this.todo.id, { 
            method: "PUT", 
            headers: { 
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(this.todo) 
        })
        .then((response: any) => response.json())
        .then((toggledTodo: Todo) => {
            state.todos = state.todos.map((t: Todo) => t.id != this.todo.id? t : Todo.copyFrom(toggledTodo));
            resolve(state);
        })
        .catch((errors: any) => reject(errors));
    }
}

export class FetchTodosAsyncAction implements IAsyncAction {

    public execute(state: IAppState, resolve: (value?: IState) => void, reject: (errors?: any) => void): void {
        fetch("api/todos")
        .then((response: any) => response.json())
        .then((todos: Array<Todo>) => {
            state.todos = todos;
            resolve(state);
        })
        .catch((errors: any) => reject(errors));
    }
}