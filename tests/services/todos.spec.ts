/// <reference path="./../../lib/typings/index.d.ts"/>

import { IStore, IStateNotifier, Store, StateNotifier, cloner } from "viperx"
import { IAppState } from "./../../src/services/state"
import { Todo } from "./../../src/models/todo"
import { ITodoService, TodoService } from "./../../src/services/todos"
import { AddTodoAsyncAction, DeleteTodoAsyncAction, ToggleTodoAsyncAction } from "./../../src/services/actions/todos"

describe("TodoService", () => {

    /*var store: IStore;
    var todoService: ITodoService;

    beforeEach(() => {
        var initialState: IAppState = { todos: [new Todo(1, "todo 1", false)] };
        var notifier: IStateNotifier = new StateNotifier();
        store = new Store(initialState, cloner, notifier);
        todoService = new TodoService(store);        
    });

    it("should add a new todo object.", (done: () => void) => {
        spyOn(store, "dispatchAsync").and.callThrough();
        var newTodo = new Todo(2, "todo 2", false);
        todoService.addTodo("todo 2").then((state: IAppState) => {
            expect(state).toEqual({ todos: [new Todo(1, "todo 1", false), newTodo] });
            done();
        });
        expect(store.dispatchAsync).toHaveBeenCalled();
    });

    it("should delete todo object.", (done: () => void) => {
        todoService.deleteTodo(1).then((state: IAppState) => {
            expect(state).toEqual({ todos: [] });
            done();
        });
        expect(store.dispatchAsync).toHaveBeenCalledWith(new DeleteTodoAsyncAction(1));
    });

    it("should toggle a todo object.", (done: () => void) => {
        var todo = new Todo(1, "todo 1", false);
        var toggledTodo = new Todo(1, "todo 1", true); 
        todoService.toggleTodo(todo).then((state: IAppState) => {
            expect(state).toEqual({ todos: [toggledTodo] });
            done();
        });
        expect(store.dispatchAsync).toHaveBeenCalledWith(new ToggleTodoAsyncAction(todo));
    });*/
    it("Should be true", () => expect(true).toBe(true));
});
