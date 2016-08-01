/// <reference path="./../../lib/typings/index.d.ts"/>

import { IStore, IStateNotifier, Store, StateNotifier, cloner } from "viperx"
import { IAppState } from "./../../src/services/state"
import { Todo } from "./../../src/models/todo"
import { ITodoService, TodoService } from "./../../src/services/todos"
import { AddTodoAsyncAction, DeleteTodoAsyncAction, ToggleTodoAsyncAction } from "./../../src/services/actions/todos"

describe("TodoService", () => {

    var store: IStore;
    var todoService: ITodoService;

    beforeEach(() => {
        var initialState: IAppState = { lastTodoId: 1, todos: [new Todo(1, "todo 1", false)] };
        var notifier: IStateNotifier = new StateNotifier();
        store = new Store(initialState, cloner, notifier);
        todoService = new TodoService(store);
        spyOn(store, "dispatchAsync").and.callThrough();
    });

    it("should add a new todo object.", (done: () => void) => {
        todoService.addTodo("todo 2").then((state: IAppState) => {
            expect(state).toEqual({ lastTodoId: 2, todos: [new Todo(1, "todo 1", false), new Todo(2, "todo 2", false)] });
            done();
        });
        expect(store.dispatchAsync).toHaveBeenCalledWith(new AddTodoAsyncAction("todo 2"));
    });

    it("should delete todo object.", (done: () => void) => {
        todoService.deleteTodo(1).then((state: IAppState) => {
            expect(state).toEqual({ lastTodoId: 1, todos: [] });
            done();
        });
        expect(store.dispatchAsync).toHaveBeenCalledWith(new DeleteTodoAsyncAction(1));
    });

    it("should toggle a todo object.", (done: () => void) => {
        var todo = new Todo(1, "todo 1", false);
        todoService.toggleTodo(todo).then((state: IAppState) => {
            expect(state).toEqual({ lastTodoId: 1, todos: [new Todo(1, "todo 1", true)] });
            done();
        });
        expect(store.dispatchAsync).toHaveBeenCalledWith(new ToggleTodoAsyncAction(todo));
    });
});
