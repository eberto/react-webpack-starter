/// <reference path="../../../lib/typings/index.d.ts" />

import { Promise } from "es6-promise"
import { IAction, IAsyncAction, IState } from "viperx"
import { IAppState } from "./../state"
import { Todo } from "./../../models/todo"

export class AddTodoAction implements IAction {

    constructor(private text: string) {
        this.text = text;
    }

    public execute(state: IAppState): IState {
        state.todos.push(new Todo(state.lastTodoId++, this.text, false));
        return state;
    }
}

export class AddTodoAsyncAction implements IAsyncAction {

    constructor(private text: string) {
        this.text = text;
    }

    public execute(state: IAppState, resolve: (value?: IState) => void, reject: (errors?: any) => void): void {

        var promise = Promise.resolve(++state.lastTodoId);  //TODO: call post with fetch.

        promise.then((newId: number) => {
            state.todos.push(new Todo(newId, this.text, false));
            state.lastTodoId = newId;
            resolve(state);
        })
        .catch((errors: any) => {
            reject(errors);
        });
    }
}

export class DeleteTodoAsyncAction implements IAsyncAction {

    constructor(private todoId: number) {
    }

    public execute(state: IAppState, resolve: (value?: IState) => void, reject: (errors?: any) => void): void {

        var promise = Promise.resolve({});  //TODO: call post with fetch.

        promise.then(() => {
            var self = this;
            var todoToDelete = state.todos.filter((t: Todo) => {
                return t.id == self.todoId;
            })[0];
            var todoIndex = state.todos.indexOf(todoToDelete);
            state.todos.splice(todoIndex, 1);
            resolve(state);
        })
        .catch((errors: any) => {
            reject(errors);
        });
    }
}

export class ToggleTodoAsyncAction implements IAsyncAction {

    public constructor(private todo: Todo) {
    }

    public execute(state: IAppState, resolve: (value?: IState) => void, reject: (errors?: any) => void): void {

        var promise = Promise.resolve({});  //TODO: call post with fetch.

        promise.then(() => {
            var self = this;
            var todoToToggle = state.todos.filter((t: Todo) => {
                return t.id == self.todo.id;
            })[0];
            todoToToggle.completed = !todoToToggle.completed;
            resolve(state);
        })
        .catch((errors: any) => {
            reject(errors);
        });
    }
}