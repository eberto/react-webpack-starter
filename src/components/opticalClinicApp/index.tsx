/// <reference path="../../../lib/typings/index.d.ts" />
/// <reference path="../../../lib/typings/index.locals.d.ts" />

import * as React from "react"
import { IClientsService } from "./../../services/clients"
import { Client } from "./../../models/client";
import { Clients } from "./../clients"

export interface IOpticalClinicAppProps {
    clientsService: IClientsService;
}

export interface IOpticalClinicAppState {
    clients: Array<Client>;
}

export class OpticalClinicApp extends React.Component<IOpticalClinicAppProps, IOpticalClinicAppState> {
    
    constructor() {
        super();
        this.state = { clients: new Array<Client>() };
    }

    componentDidMount() {
        this.props.clientsService.fetch().then((clients: Array<Client>) => {
            this.setState({ clients: clients });
        });
    }
    
    render() {
        var clientsService = this.props.clientsService;
        var clientsStyle = { marginLeft: "auto", marginRight: "auto", marginTop: "80px", width: "90%"/*, border: "1px solid black"*/ }
        return (
        	<Clients style={clientsStyle} clients={clientsService.getAll()} onDelete={clientsService.delete.bind(clientsService)} isFetching={clientsService.isFetching()} />
        );
    }
}