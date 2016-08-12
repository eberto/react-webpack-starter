/// <reference path="../../../lib/typings/index.d.ts" />

import "./styles/index.scss"

import * as React from "react"
import { assign } from "lodash"
import * as format from "date-format"
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table"
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
            <div className="z-depth-3" style={this.props.style}>
                <table className="row">
                    <thead>
                        <tr className="row">
                            <th className="col s1">Nombre</th>
                            <th className="col s1">Apellido</th>
                            <th className="col s2">RUC / CI</th>
                            <th className="col s1">Nacimiento</th>
                            <th className="col s1">Edad</th>
                            <th className="col s3">Dirección</th>
                            <th className="col s2">Correo</th>
                            <th className="col s1">Acciones</th>
                        </tr>
                    </thead>
                </table>
            </div>
        );        
    }
}