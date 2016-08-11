import "./styles/roboto-font.css"
import "./styles/flexboxgrid.css"

import { IStore, Store } from "viperx"
import { IAppState } from "./../../models/state"
import { Client } from "./../../models/client"
import { ViewRenderer } from "./renderer"
import { IClientsService, ClientsService } from "./../../services/clients"
import * as injectTapEventPlugin from "react-tap-event-plugin"

var store = new Store<IAppState>({ clients: new Array<Client>() });
var clientsService: IClientsService = new ClientsService(store);
var renderer = new ViewRenderer(store, clientsService, "root");

injectTapEventPlugin();
renderer.render();