/// <reference path="../lib/typings/index.d.ts"/>

/*import * as React from "react";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-addons-test-utils";
import * as deepFreeze from "deep-freeze";

import { todosReducer, Todo, AddTodoAction, ToggleTodoAction } from "./../src/stores/todos";

describe("Todos", () => {

    it("Should add a new todo", () => {
        const stateBefore: Array<Todo> = [];
        const newTodo = new Todo(0, "Learn Redux", false);
        const action = new AddTodoAction(newTodo);
        const stateAfter = [newTodo];
        
        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(todosReducer(stateBefore, action)).toEqual(stateAfter);
    });

    it("Should toggle a todo", () => {
        let todo1 = new Todo(0, "Learn Redux", false);
        let todo2 = new Todo(1, "Keep learning Redux", false);

        const stateBefore: Array<Todo> = [todo1, todo2];
        const action = new ToggleTodoAction(todo2);
        const stateAfter = [todo1, new Todo(todo2.id, todo2.text, true)];
        
        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(todosReducer(stateBefore, action)).toEqual(stateAfter);
    });
});*/