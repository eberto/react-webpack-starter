import { ICloner, IStore } from "./../framework/store"
import { IStateNotifier } from "./../framework/observer"
import { IAppState } from "./../services/state"
import { StateNotifier } from "./../framework/observer/notifier"
import { Cloner } from "./../framework/store/cloner"
import { Store } from "./../framework/store/store"
import { ViewRenderer } from "./../components/app/renderer"
import { ITodoService, TodoService } from "./../services/todos"

var cloner: ICloner = new Cloner();

var notifier: IStateNotifier = new StateNotifier();

var store: IStore = new Store({ todos: [], lastTodoId: 0 }, cloner, notifier);

export var todoService: ITodoService = new TodoService(store);

export var renderer = new ViewRenderer(notifier, todoService, "root");