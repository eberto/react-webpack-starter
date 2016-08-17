/// <reference path="../../../lib/typings/index.d.ts" />

import "./styles/index.scss"

import * as React from "react"
import * as Measure from "react-measure"
import { assign } from "lodash"
import * as format from "date-format"
import Checkbox from "material-ui/Checkbox"
import Paper from "material-ui/Paper"
import { Client } from "./../../models/client"
import { ClientItem } from "./../clientItem"

export interface IClientsProps {
    className?: string;
    style?: any;
    clients: Array<Client>;
    isFetching: boolean;
    onDelete: (todoId: number) => void;
}

export interface IClientsState {
}

export class Clients extends React.Component<IClientsProps, IClientsState> {
    constructor() {
        super();
        this.state = { dimensions: { width: 0 }, extraWidth: 0};
    }
    colStyle(width: number): any {
        return {
            paddingLeft: 5,
            paddingRight: 5,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: width || Math.max(width || 0, 0)
        };
    }
    
    // handleResize() {
    //     //console.log("resizing...");
    //     this.setState({});
    // }

    // componentDidMount() {
    //     window.addEventListener('resize', this.handleResize.bind(this));
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.handleResize.bind(this));
    // }

    private fixedWidthSum = 40 + 85 + 85 + 70 + 70 + 80 + 40 + 80;

    private renderCount = 0;

    render() {
        //console.log("rendering...")
        var tableStyle = {
            //minWidth: 252,
            tableLayout: "fixed"
        };
        console.log("rendering times: " + (++this.renderCount));
        return (
            <Paper zDepth={1} style={this.props.style}>
                <Measure whitelist={["width"]}>
                    {(dimensions: any) => {
                        //var fixedWidthSum = 40 + 85 + 85 + 70 + 70 + 80 + 40 + 80;
                        var extraWidth = Math.max(dimensions.width - this.fixedWidthSum, 0);
                        //console.log(extraWidth);
                        //console.log(dimensions.width);
                        var quarter = extraWidth / 4;
                        var colWidths =    [40, quarter,  quarter, 85, 85, quarter, 70, 70, 80, quarter, 40, 80];
                        return <table className="row" style={tableStyle}>
                            <thead>
                                <tr className="row">
                                    <th style={this.colStyle(colWidths[0])}><Checkbox /></th>
                                    <th style={this.colStyle(colWidths[1])}>Nombre</th>
                                    <th style={this.colStyle(colWidths[2])}>Apellido</th>
                                    <th style={this.colStyle(colWidths[3])}>RUC / CI</th>
                                    <th style={this.colStyle(colWidths[4])}>F. Nacimiento</th>
                                    <th style={this.colStyle(colWidths[5])}>Dirección</th>
                                    <th style={this.colStyle(colWidths[6])}>Teléfono 1</th>
                                    <th style={this.colStyle(colWidths[7])}>Teléfono 2</th>
                                    <th style={this.colStyle(colWidths[8])}>Tel. Móvil</th>
                                    <th style={this.colStyle(colWidths[9])}>Correo E.</th>
                                    <th style={this.colStyle(colWidths[10])}>Edad</th>
                                    <th style={this.colStyle(colWidths[11])}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.clients.map((client: Client) =>
                                    <tr key={client.id}>
                                        <td style={this.colStyle(colWidths[0])}><Checkbox /></td>
                                        <td style={this.colStyle(colWidths[1])}>{client.firstName}</td>
                                        <td style={this.colStyle(colWidths[2])}>{client.lastName}</td>
                                        <td style={this.colStyle(colWidths[3])}>{client.identification}</td>
                                        <td style={this.colStyle(colWidths[4])}>1988/01/19</td>
                                        <td style={this.colStyle(colWidths[5])}>{client.address}</td>
                                        <td style={this.colStyle(colWidths[6])}>{client.phone1}</td>
                                        <td style={this.colStyle(colWidths[7])}>{client.phone2}</td>
                                        <td style={this.colStyle(colWidths[8])}>{client.mobilePhone}</td>
                                        <td style={this.colStyle(colWidths[9])}>{client.email}</td>
                                        <td style={this.colStyle(colWidths[10])}>{client.age}</td>
                                        <td style={this.colStyle(colWidths[11])}>Actions</td>
                                    </tr>
                                )}                            
                                <tr className="row last-row">
                                    <td className="col s12">1</td>
                                </tr>
                            </tbody>
                        </table>
                    }}
                </Measure>
            </Paper>
        );        
    }
}