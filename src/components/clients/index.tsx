/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import * as format from "date-format"
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table"
import CircularProgress from "material-ui/CircularProgress"
import { Client } from "./../../models/client"
import { ClientItem } from "./../clientItem"

export interface IClientsProps {
    clients: Array<Client>;
    isFetching: boolean;
    onDelete: (todoId: number) => void;
}

export class Clients extends React.Component<IClientsProps, {}> {
    render() {
        var tableStyle = {
            //width: "100%"
            border: "1px solid red"
        };
        var nameStyle = {
            //width: "8%"
        };
        var lastNameStyle = {
            //width: "10%"
        };
        var identifStyle = {
            //width: "70px",
        };
        var birthDateStyle = {
            //width: "67px"
        };
        var ageStyle = {
            //width: "23px"
        };
        var addressStyle = {
            //width: "150px"
        };
        var phoneStyle = {
            //width: "96px"
        };
        var emailStyle = {
            //width: "200px"
        };
        return (
            this.props.isFetching?
                <CircularProgress style={{display: "block", marginLeft: "auto", marginRight: "auto"}} size={1}/> :
                <Table className="row" style={tableStyle}>  
                    <TableHeader className="row">
                        <TableRow className="row">
                            <TableHeaderColumn className="col s1" style={nameStyle}>Nombre</TableHeaderColumn>
                            <TableHeaderColumn className="col s1" style={lastNameStyle}>Apellidos</TableHeaderColumn>
                            <TableHeaderColumn className="col s1" style={identifStyle}>RUC / CI</TableHeaderColumn>
                            <TableHeaderColumn className="col s1" style={birthDateStyle}>Nacimiento</TableHeaderColumn>
                            <TableHeaderColumn className="col s1" style={ageStyle}>Edad</TableHeaderColumn>
                            <TableHeaderColumn className="col s1" style={addressStyle}>Dirección</TableHeaderColumn>
                            <TableHeaderColumn className="col s1" style={phoneStyle}>Teléfono Principal</TableHeaderColumn>
                            <TableHeaderColumn className="col s1" style={emailStyle}>Correo</TableHeaderColumn>
                            <TableHeaderColumn className="col s4" >Acciones</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>                  
                    <TableBody className="row">
                        {this.props.clients.map((client: Client) => 
                            <TableRow className="row" key={client.id}>
                                <TableRowColumn className="col l1" style={nameStyle}>{client.firstName}</TableRowColumn>
                                <TableRowColumn className="col l1" style={lastNameStyle}>{client.lastName}</TableRowColumn>
                                <TableRowColumn className="col s1" style={identifStyle}>{client.identification}</TableRowColumn>
                                <TableRowColumn className="col s1" style={birthDateStyle}>{format.asString("dd/MM/yyyy", client.birthDate)}</TableRowColumn>
                                <TableRowColumn className="col s1" style={ageStyle}>{client.age}</TableRowColumn>
                                <TableRowColumn className="col s1" style={addressStyle}>{client.address}</TableRowColumn>
                                <TableRowColumn className="col s1" style={phoneStyle}>{client.phone1}</TableRowColumn>
                                <TableRowColumn className="col s1" style={emailStyle}>{client.email}</TableRowColumn>
                                <TableRowColumn className="col <s4></s4>">Actions</TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
        );
    }
}