/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import * as ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import { IClientsService } from "./../../services/clients"
import { IStateNotifier, Renderer } from "viperx"
import { OpticalClinicApp } from "./../opticalClinicApp"

export class ViewRenderer extends Renderer {

    public constructor(notifier: IStateNotifier, private clientsService: IClientsService, protected rootElementId: string) {
        super(notifier, rootElementId);
    }

    public render(): void {
        ReactDOM.render(
            <OpticalClinicApp clientsService={this.clientsService} />
            , this.getRootDiv());
    }
}