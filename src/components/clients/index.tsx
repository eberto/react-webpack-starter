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
	totalWidth: number;
}

interface IColData {
    width: number | string;
    minVisibleContainerWidth?: number;
    headerText?: string;
    modelPropName?: string;
}

export class Clients extends React.Component<IClientsProps, IClientsState> {
    private colsData: Array<IColData> = [{
        width: 40
    }, {
        headerText: "Nombre",
        modelPropName: "firstName",
        width: "25%"
    }, {
        headerText: "Apellido",
        modelPropName: "lastName",
        width: "25%"
    }, {
        headerText: "RUC / CI",
        modelPropName: "identification",
        width: 90
    }, {
        headerText: "F. Nacimiento",
        width: 85,
        minVisibleContainerWidth: 900
    }, {
        headerText: "Dirección",
        modelPropName: "address",
        width: "25%"
    }, {
        headerText: "Teléfono 1",
        modelPropName: "phone1",
        width: 70,
        minVisibleContainerWidth: 900
    }, {
        headerText: "Teléfono 2",
        modelPropName: "phone2",
        width: 70,
        minVisibleContainerWidth: 900
    }, {
        headerText: "Tel. Móvil",
        modelPropName: "mobilePhone",
        width: 80
    }, {
        headerText: "Correo E.",
        modelPropName: "email",
        width: "25%"
    }, {
        headerText: "Edad",
        modelPropName: "age",
        width: 40
    }, {
        width: 80
    }];

    constructor() {
        super();
        this.state = { totalWidth: 0 };
    }
    isColVisible(colData: IColData) {
        var minVisibleWidth = colData.minVisibleContainerWidth;
        return !minVisibleWidth || this.state.totalWidth > minVisibleWidth;
    }
    sumFixed(): number {
        var result = 0;
        for(var i = 0; i < this.colsData.length; i++) {
            var width = this.colsData[i].width;
            if(typeof width === "number" && this.isColVisible(this.colsData[i])) {
                result = result + width;
            }
        }
        return result;
    }
    calcExtraPercent(): number {
        var remainingWidth = 0;
        var totalVisibleCols = 0;
        for(var i = 0; i < this.colsData.length; i++) {
            var width = this.colsData[i].width;
            if(typeof width === "string") {
                if(!this.isColVisible(this.colsData[i])) {
                    remainingWidth += parseInt(width.substring(0, width.length - 1));
                }
                else {
                    totalVisibleCols++;
                }
            }
        }
        console.log(remainingWidth);
        return remainingWidth / totalVisibleCols;
    }
    calcColPercentWidth(width: string): string {
        var extraWidth = this.state.totalWidth - this.sumFixed();
        var extraPercent = parseInt(width.substring(0, width.length - 1)) / 100 * extraWidth + this.calcExtraPercent();
        return (extraPercent * 100 / this.state.totalWidth) + "%";
    }
    colStyle(width: number|string): any {
        var realWidth = width;
        if(typeof width === "string") {
            realWidth = this.calcColPercentWidth(width);
        }
        return {
            paddingLeft: 5,
            paddingRight: 5,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: realWidth
        };
    }

    render() {
        console.log("rendering...");
        var tableStyle = {
            tableLayout: "fixed"
        };
        
        return (
            <Paper zDepth={1} style={this.props.style}>
                <Measure whitelist={["width"]} onMeasure={(dimensions: any) => this.setState({totalWidth: dimensions.width})}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                {this.colsData.map((colData: IColData, index: number) => 
                                    this.isColVisible(colData)?
                                        (index === 0?
                                            <th key={"th_"+index} style={this.colStyle(colData.width)}><Checkbox /></th> :
                                            <th key={"th_"+index} style={this.colStyle(colData.width)}>{colData.headerText || ""}</th>) :
                                        false
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.clients.map((client: Client) => 
                                <tr key={client.id}>
                                    {this.colsData.map((colData: IColData, index: number) =>
                                        this.isColVisible(colData)?
                                            (index === 0?
                                                <td key={"td_"+client.id + "_"+index} style={this.colStyle(colData.width)}><Checkbox /></td> :
                                                <td key={"td_"+client.id + "_"+index} style={this.colStyle(colData.width)}>{(client as any)[colData.modelPropName] || ""}</td>) :
                                            false
                                    )}
                                </tr>
                            )}
                            <tr className="last-row">
                                <td>Last Row for Pagination</td>
                            </tr>
                        </tbody>
                    </table>
                </Measure>
            </Paper>
        );        
    }
}