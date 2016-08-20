/// <reference path="../../../lib/typings/index.d.ts" />

import "./styles/index.scss"

import * as React from "react"
import Paper from "material-ui/Paper"
import { Client } from "./../../models/client"
import {DataTable} from "../material/table/index"
import {TextColumn} from "../material/table/TextColumn"
import {SelectionColumn} from "../material/table/SelectionColumn"
import {ActionsColumn} from "../material/table/ActionsColumn"

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
    isColVisible(totalWidth: number, colData: IColData) {
        var minVisibleWidth = colData.minVisibleContainerWidth;
        return !minVisibleWidth || totalWidth > minVisibleWidth;
    }
    sumFixed(): number {
        var result = 0;
        this.colsData.forEach((colData: IColData) => {
            var width = colData.width;
            if(typeof width === "number" && colData.isVisible) {
                result += width;
            }
        });
        return result;
    }
    avgVariableAvailableWidth(): number {
        var invisibleVariableTotalWidth = 0;
        var visibleColsCount = 0;
        this.colsData.forEach((colData: IColData) => {
            var width = colData.width;
            if(typeof width === "string") {
                if(!colData.isVisible) {
                    invisibleVariableTotalWidth += parseInt(width.substring(0, width.length - 1));
                }
                else {
                    visibleColsCount++;
                }
            }
        });
        return invisibleVariableTotalWidth > 0? invisibleVariableTotalWidth / visibleColsCount : 0;
    }
    calcColWidth(totalWidth: number, variableWidth: number, avgAvailableWidth: number, width: number|string): any {
        var result = width;
        if(typeof width === "string") {
            var withNum = parseInt(width.substring(0, width.length - 1)) / 100;
            var pixels = withNum * variableWidth + avgAvailableWidth;
            result = (pixels * 100 / totalWidth) + "%";
        }
        return result;
    }
    setColStyles(totalWidth: number): void {
        this.colsData.forEach((colData: IColData) => colData.isVisible = this.isColVisible(totalWidth, colData));
        var variableWidth = totalWidth - this.sumFixed();
        var avgAvailableWidth = this.avgVariableAvailableWidth();
        this.colsData.forEach((colData: IColData) => colData.style = {
            paddingLeft: 5,
            paddingRight: 5,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: this.calcColWidth(totalWidth, variableWidth, avgAvailableWidth, colData.width)
        });
    }

    render() {
        var tableStyle = {
            tableLayout: "fixed",
            border: "2px solid red",
            width: "100%"
        };
        //After RUC / CI:  <TextColumn headerText="F. Nacimiento" modelProp="birthDate" />
        return (
            <Paper zDepth={1} style={this.props.style}>
                <DataTable data={this.props.clients}>
                    <SelectionColumn onSelect={()=>{}} />
                    <TextColumn headerText="Nombre" modelProp="firstName" width="25%" />
                    <TextColumn headerText="Apellido" modelProp="lastName" width="25%" />
                    <TextColumn headerText="RUC / CI" modelProp="identification" width={90}  minWidthVisible={1000} />
                    <TextColumn headerText="Dirección" modelProp="address" width="25%" minWidthVisible={1000} />
                    <TextColumn headerText="Teléfono 1" modelProp="phone1" width={70}  minWidthVisible={1000} />
                    <TextColumn headerText="Teléfono 2" modelProp="phone2"  width={70}  minWidthVisible={1300} />
                    <TextColumn headerText="Tel. Móvil" modelProp="mobilePhone" width={80} />
                    <TextColumn headerText="Correo E." modelProp="email" width="25%"  minWidthVisible={1000} />
                    <TextColumn headerText="Edad" modelProp="age" width={40}  minWidthVisible={1000} />
                    <ActionsColumn onEdit={()=>{}} onDelete={()=>{}} width={80} />
                </DataTable>
            </Paper>
        );

        /*<Measure whitelist={["width"]} blacklist={["height", "left", "right", "top", "bottom"]}
                 onMeasure={(dimensions: any) => {
                             if(dimensions.width > 0) {
                                 this.setColStyles(dimensions.width);
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
                <tr>
                    <td>{this.state.totalWidth}</td>
                </tr>
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
                    <td>Pagination</td>
                </tr>
                </tbody>
            </table>
        </Measure>*/
    }
}