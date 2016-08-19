/// <reference path="../../../lib/typings/index.d.ts" />
/// <reference path="../../../lib/typings/index.locals.d.ts" />

import * as React from "react"
import { IClientsService } from "./../../services/clients"
import { Client } from "./../../models/client";
import { Clients } from "./../clients"
import { Checkbox } from "./../material/Checkbox"

export interface IOpticalClinicAppProps {
    clientsService: IClientsService;
}

export class OpticalClinicApp extends React.Component<IOpticalClinicAppProps, {}> {
    
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.clientsService.fetch();
    }
    
    render() {
        var clientsService = this.props.clientsService;
        var clientsStyle = { marginLeft: "auto", marginRight: "auto", padding: 24, marginTop: "80px", width: "90%", minWidth: 300 };
        return (
            <Clients style={clientsStyle} clients={clientsService.getAll()} onDelete={clientsService.delete.bind(clientsService)} isFetching={clientsService.isFetching()} />
        );
    }
}