// /// <reference path="./../../lib/typings/index.d.ts"/>

// import { IStore, Store } from "viperx"
// import { IAppState } from "./../../src/models/state"
// import { Todo } from "./../../src/models/todo"
// import { ITodoService, TodoService } from "./../../src/services/todos"
// import { AddTodoAsyncAction, DeleteTodoAsyncAction, ToggleTodoAsyncAction } from "./../../src/services/actions/todos"
// import * as fetchMock from "fetch-mock"

// describe("TodoService", () => {

//     var store: IStore<IAppState>;
//     var todoService: ITodoService;

//     beforeEach(() => {
//         var initialState: IAppState = { todos: [new Todo(1, "todo 1", false)] };
//         store = new Store(initialState);
//         todoService = new TodoService(store);       
//         spyOn(store, "dispatchAsync").and.callThrough();
//     });

//     it("should add a new todo object.", (done: () => void) => {
//         var newTodo = new Todo(2, "todo 2", false);
//         fetchMock.mock("api/todos", Promise.resolve(newTodo), { method: "POST"}); 
//         todoService.addTodo("todo 2").then((state: IAppState) => {
//             expect(state).toEqual({ todos: [new Todo(1, "todo 1", false), newTodo] });
//             done();
//         });
//         expect(store.dispatchAsync).toHaveBeenCalled();
//         expect(fetchMock.called("api/todos"));
//     });

//     it("should delete todo object.", (done: () => void) => {
//         fetchMock.mock("api/todos/1", Promise.resolve({}), { method: "DELETE"}); 
//         todoService.deleteTodo(1).then((state: IAppState) => {
//             expect(state).toEqual({ todos: [] });
//             done();
//         });
//         expect(store.dispatchAsync).toHaveBeenCalledWith(new DeleteTodoAsyncAction(1));
//         expect(fetchMock.called("api/todos/1"));
//     });

//     it("should toggle a todo object.", (done: () => void) => {
//         var todo = new Todo(1, "todo 1", false);
//         var toggledTodo = new Todo(1, "todo 1", true); 
//         fetchMock.mock("api/todos/1", Promise.resolve(toggledTodo), { method: "PUT"}); 
//         todoService.toggleTodo(todo).then((state: IAppState) => {
//             expect(state).toEqual({ todos: [toggledTodo] });
//             done();
//         });
//         expect(store.dispatchAsync).toHaveBeenCalledWith(new ToggleTodoAsyncAction(todo));
//         expect(fetchMock.called("api/todos/1"));
//     });
// });
