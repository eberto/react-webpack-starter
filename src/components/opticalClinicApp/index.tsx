/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import Paper from "material-ui/Paper"

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
        var style = { marginLeft: "auto", marginRight: "auto", marginTop: "80px", border: "1px solid black" }
        return (
            <Paper className="container" style={style} zDepth={3}>
                <Clients clients={clientsService.getAll()} onDelete={clientsService.delete.bind(clientsService)} isFetching={clientsService.isFetching()} />
            </Paper>
        );
    }
}