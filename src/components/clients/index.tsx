/// <reference path="../../../lib/typings/index.d.ts" />

import "./styles/index.scss"

import * as React from "react"
import * as Measure from "react-measure"
import Checkbox from "material-ui/Checkbox"
import Paper from "material-ui/Paper"
import { Client } from "./../../models/client"

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
    style?: Object;
    isVisible?: boolean;
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
        width: 90,
        minVisibleContainerWidth: 1000
    }, {
        headerText: "F. Nacimiento",
        width: 85,
        minVisibleContainerWidth: 1000
    }, {
        headerText: "Dirección",
        modelPropName: "address",
        width: "25%",
        minVisibleContainerWidth: 1000
    }, {
        headerText: "Teléfono 1",
        modelPropName: "phone1",
        width: 70,
        minVisibleContainerWidth: 1000
    }, {
        headerText: "Teléfono 2",
        modelPropName: "phone2",
        width: 70,
        minVisibleContainerWidth: 1300
    }, {
        headerText: "Tel. Móvil",
        modelPropName: "mobilePhone",
        width: 80
    }, {
        headerText: "Correo E.",
        modelPropName: "email",
        width: "25%",
        minVisibleContainerWidth: 1000
    }, {
        headerText: "Edad",
        modelPropName: "age",
        width: 40,
        minVisibleContainerWidth: 1000
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
            if(typeof width === "number" && this.colsData[i].isVisible) {
                result += width;
            }
        }
        return result;
    }
    calcAvgAvailableWidth(): number {
        var remainingWidth = 0;
        var totalVisibleCols = 0;
        for(var i = 0; i < this.colsData.length; i++) {
            var width = this.colsData[i].width;
            if(typeof width === "string") {
                if(!this.colsData[i].isVisible) {
                    remainingWidth += parseInt(width.substring(0, width.length - 1));
                }
                else {
                    totalVisibleCols++;
                }
            }
        }
        return remainingWidth / totalVisibleCols;
    }
    calcColPercentWidth(totalWidth: number, width: string): string {
        var extraWidth = totalWidth - this.sumFixed();
        var extraPercent = parseInt(width.substring(0, width.length - 1)) / 100 * extraWidth + this.calcAvgAvailableWidth();
        return (extraPercent * 100 / totalWidth) + "%";
    }
    colStyle(totalWidth: number, width: number|string): any {
        var realWidth = width;
        if(typeof width === "string") {
            realWidth = this.calcColPercentWidth(totalWidth, width);
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
    calcColSizes(totalWidth: number): void {
        console.log("Table width in calculation: " + totalWidth);
        console.log("Calculating...");
        this.colsData.forEach((colData: IColData) => {
            colData.style = this.colStyle(totalWidth, colData.width);
            colData.isVisible = this.isColVisible(colData);
        });
    }
    shouldComponentUpdate(nextProps: IClientsProps, nextState: IClientsState) {

        /*console.log("Next Props: ");
        console.log(nextProps);
        console.log("Curr Props: ");
        console.log(this.props);
        console.log("Next State: ");
        console.log(nextState);
        console.log("Curr State: ");
        console.log(this.state);*/

        //return this.state.totalWidth !== nextState.totalWidth && this.props.clients.length !== nextProps.clients.length;

        //console.log("Next state width: " + nextState.totalWidth);
        //return nextState.totalWidth > 0;
        return true;

    }

    private renderTimes: number = 0;

    render() {
        console.log("rendering..." + (++this.renderTimes));

        var tableStyle = {
            tableLayout: "fixed",
            border: "2px solid red",
            width: "100%"
        };
        
        return (
            <Paper zDepth={1} style={this.props.style}>
                <Measure whitelist={["width"]} blacklist={["height", "left", "right", "top", "bottom"]}
                         onMeasure={(dimensions: any) => {
                             console.log("Measuring...");
                             if(dimensions.width > 0 && this.props.clients.length > 0) {
                                 this.calcColSizes(dimensions.width);
                                 this.setState({totalWidth: dimensions.width});
                             }
                         }}>
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                {this.colsData.map((colData: IColData, index: number) => 
                                    colData.isVisible?
                                        (index === 0?
                                            <th key={"th_"+index} style={colData.style}><Checkbox /></th> :
                                            <th key={"th_"+index} style={colData.style}>{colData.headerText || ""}</th>) :
                                        false
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.clients.map((client: Client) => 
                                <tr key={client.id}>
                                    {this.colsData.map((colData: IColData, index: number) =>
                                        colData.isVisible?
                                            (index === 0?
                                                <td key={"td_"+client.id + "_"+index} style={colData.style}><Checkbox /></td> :
                                                <td key={"td_"+client.id + "_"+index} style={colData.style}>{(client as any)[colData.modelPropName] || ""}</td>) :
                                            false
                                    )}
                                </tr>
                            )}
                            <tr className="last-row">
                                <td>{this.state.totalWidth}</td>
                            </tr>
                        </tbody>
                    </table>
                </Measure>
            </Paper>
        );        
    }
}