import { ICloner, IStore, Store, cloner, notifier } from "viperx"
import { IAppState } from "./../services/state"
import { ViewRenderer } from "./../components/app/renderer"
import { ITodoService, TodoService } from "./../services/todos"

var store: IStore = new Store({ todos: [], lastTodoId: 0 }, cloner, notifier);

export var todoService: ITodoService = new TodoService(store);

export var renderer = new ViewRenderer(notifier, todoService, "root");