import { IStore, Store } from "viperx"
import { IAppState } from "./../../models/state"
import { ViewRenderer } from "./../../components/app/renderer"
import { ITodoService, TodoService } from "./../../services/todos"
import * as fetch from "isomorphic-fetch"

var store = new Store<IAppState>({ todos: [] });

export var todoService: ITodoService = new TodoService(store);
export var renderer = new ViewRenderer(store, todoService, "root");

renderer.render();