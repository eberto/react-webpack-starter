/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { Clients } from "./../clients"
import { IClientsService } from "./../../services/clients"
import { IStateNotifier, Renderer } from "viperx"

export class ViewRenderer extends Renderer {

    public constructor(notifier: IStateNotifier, private clientsService: IClientsService, protected rootElementId: string) {
        super(notifier, rootElementId);
    }

    public render(): void {
        var clientsService = this.clientsService;
        var clientsStyle = { marginLeft: "auto", marginRight: "auto", width: "90%", marginTop: "80px" };
        ReactDOM.render(
            <MuiThemeProvider>
                <Clients clientsService={clientsService} style={clientsStyle} />
            </MuiThemeProvider>
            , this.getRootDiv());
    }
}