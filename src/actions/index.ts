/// <reference path="../../lib/typings/index.d.ts" />

import { Promise } from "es6-promise"
import { IAction, IAsyncAction, IState } from "./../framework/store/abstractions"
import { IAppState } from "./state"
import { Todo } from "./../models/todo"

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
                console.log("comparing " + t.id + " with " + self.todoId + ". Result: " + (t.id == self.todoId));
                return t.id == self.todoId;
            });
            var todoIndex = state.todos.indexOf(todoToDelete[0]);
            state.todos.splice(todoIndex, 1);
            resolve(state);
        })
        .catch((errors: any) => {
            reject(errors);
        });
    }
}