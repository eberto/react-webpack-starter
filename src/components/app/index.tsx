import { Store } from "viperx"
import { IAppState } from "./../../models/state"
import { ViewRenderer } from "./renderer"
import { IClientsService, ClientsService } from "./../../services/clients"
import * as injectTapEventPlugin from "react-tap-event-plugin"

var store = new Store<IAppState>({ clients: [], totalClients: 0 });
var clientsService: IClientsService = new ClientsService(store);
var renderer = new ViewRenderer(store, clientsService, "root");

injectTapEventPlugin();
renderer.render();