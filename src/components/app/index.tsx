import "./styles/roboto-font.css"
import { IStore, Store } from "viperx"
import { IAppState } from "./../../models/state"
import { ViewRenderer } from "./renderer"
import { ITodoService, TodoService } from "./../../services/todos"
import * as injectTapEventPlugin from "react-tap-event-plugin"

var store = new Store<IAppState>({ todos: [] });
var todoService: ITodoService = new TodoService(store);
var renderer = new ViewRenderer(store, todoService, "root");

injectTapEventPlugin();
renderer.render();