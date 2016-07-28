import { ICloner, IStore } from "./../framework/store/abstractions"
import { Cloner } from "./../framework/store/cloner"
import { Store } from "./../framework/store"
import { IAppState } from "./../actions/state"
import { ViewRenderer } from "./../components/app/renderer"
import { ITodoService, TodoService } from "./../services/todos"

var cloner: ICloner = new Cloner();

export var store: IStore = new Store({ todos: [], lastTodoId: 0 }, cloner);

export var todoService: ITodoService = new TodoService(store);

export var renderer = new ViewRenderer(store, todoService, "root");