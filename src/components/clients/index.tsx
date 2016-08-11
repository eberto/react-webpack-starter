/// <reference path="../../../lib/typings/index.d.ts" />

import * as React from "react";
import { assign } from "lodash"
import * as format from "date-format"
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table"
import Paper from "material-ui/Paper"
import CircularProgress from "material-ui/CircularProgress"
import { Client } from "./../../models/client"
import { ClientItem } from "./../clientItem"

export interface IClientsProps {
    className?: string;
    style?: any;
    clients: Array<Client>;
    isFetching: boolean;
    onDelete: (todoId: number) => void;
}

export class Clients extends React.Component<IClientsProps, {}> {
    tabColumnStyle(minWidthPixels: number, percent?: number): any {
        //var percentValue = percent? percent.toString() + "%" : "";
        var cellStyle = {
            minWidth: minWidthPixels.toString() + "px",
            paddingLeft: "5px",
            paddingRight: "5px",
            lineHeight: "48px"
        }
        return /*percent? assign(cellStyle, { flexBasis: percentValue, maxWidth: percentValue }) :*/ cellStyle;
    }
    render() {
        var tableStyle = {
        };
        var borderColStyle = {
            paddingLeft: 20,
            paddingRight: 20
        };
        var colStyle = {
            paddingLeft: 5,
            paddingRight: 5
        };
        return (
            <Paper className={this.props.className} style={this.props.style} zDepth={3}>
                {this.props.isFetching?
                <CircularProgress style={{display: "block", marginLeft: "auto", marginRight: "auto"}} size={1}/> :
                <Table style={tableStyle}>
                    <TableHeader className="container" displaySelectAll={false} adjustForCheckbox={false}>
                         <TableRow className="row">
                            <TableHeaderColumn style={borderColStyle} className="col-xs-3 col-sm-2 col-md-1 col-lg-1">Nombre</TableHeaderColumn>
                            <TableHeaderColumn style={colStyle} className="col-xs-3">Apellido</TableHeaderColumn>
                            <TableHeaderColumn style={colStyle} className="col-xs-2 col-sm-2 col-md-2 col-lg-1 hide-col-xs">RUC / CI</TableHeaderColumn>
                            <TableHeaderColumn style={colStyle} className="col-lg-1 hide-col-md">Nacimiento</TableHeaderColumn>
                            <TableHeaderColumn style={colStyle} className="col-sm-1 hide-col-xs">Edad</TableHeaderColumn>
                            <TableHeaderColumn style={colStyle} className="col-xs-2 hide-col-sm">Dirección</TableHeaderColumn>
                            <TableHeaderColumn style={colStyle} className="col-xs-4">Teléfono</TableHeaderColumn>
                            <TableHeaderColumn style={colStyle} className="col-xs-2 col-sm-3 col-md-2 col-lg-2 hide-col-xs">Correo</TableHeaderColumn>
                            <TableHeaderColumn style={borderColStyle} className="col-xs-2">Acciones</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="container" displayRowCheckbox={false} deselectOnClickaway={true} showRowHover={true} stripedRows={true}>
                        {this.props.clients.map((client: Client) => 
                            <TableRow className="row" key={client.id}>
                                <TableRowColumn style={borderColStyle} className="col-xs-3 col-sm-2 col-md-1 col-lg-1">{client.firstName}</TableRowColumn>
                                <TableRowColumn style={colStyle} className="col-xs-3">{client.lastName}</TableRowColumn>
                                <TableRowColumn style={colStyle} className="col-xs-2 col-sm-2 col-md-2 col-lg-1 hide-col-xs">{client.identification}</TableRowColumn>
                                <TableRowColumn style={colStyle} className="col-lg-1 hide-col-md">{format.asString("dd/MM/yyyy", client.birthDate)}</TableRowColumn>
                                <TableRowColumn style={colStyle} className="col-sm-1 hide-col-xs">{client.age}</TableRowColumn>
                                <TableRowColumn style={colStyle} className="col-xs-2 hide-col-sm">{client.address}</TableRowColumn>
                                <TableRowColumn style={colStyle} className="col-xs-4"><span className="hide-inline-xs">(+593)</span>{client.phone1}</TableRowColumn>
                                <TableRowColumn style={colStyle} className="col-xs-2 col-sm-3 col-md-2 col-lg-2 hide-col-xs">{client.email}</TableRowColumn>
                                <TableRowColumn style={borderColStyle} className="col-xs-2">Actions</TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>}
            </Paper>
        );        
    }
}