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

export class Clients extends React.Component<IClientsProps, IClientsState> {
    
    constructor() {
        super();
        this.state = { totalWidth: 0 };
    }

    render() {
        //After RUC / CI:  <TextColumn headerText="F. Nacimiento" modelProp="birthDate" />
        return (
            <Paper zDepth={1} style={this.props.style}>
                <DataTable title="Clientes" data={this.props.clients.filter((c: any, i: number) => i < 10)}>
                    <SelectionColumn width={66} onSelect={()=>{}} />
                    <TextColumn headerText="Nombre" modelProp="firstName" width="25%" />
                    <TextColumn headerText="Apellido" modelProp="lastName" width="25%" minWidthVisible={321} />
                    <TextColumn headerText="RUC / CI" modelProp="identification" width={90}  minWidthVisible={700} />
                    <TextColumn headerText="Dirección" modelProp="address" width="25%" minWidthVisible={1150} />
                    <TextColumn headerText="Teléfono 1" modelProp="phone1" width={70}  minWidthVisible={600} />
                    <TextColumn headerText="Teléfono 2" modelProp="phone2"  width={70}  minWidthVisible={800} />
                    <TextColumn headerText="Tel. Móvil" modelProp="mobilePhone" width={80} />
                    <TextColumn headerText="Correo E." modelProp="email" width="25%"  minWidthVisible={1000} />
                    <TextColumn headerText="Edad" modelProp="age" width={40}  minWidthVisible={500} cellStyle={{textAlign: "right"}} headerCellStyle={{textAlign: "right"}} />
                    <ActionsColumn onEdit={()=>{}} onDelete={()=>{}} width={90} />
                </DataTable>
            </Paper>
        );
    }
}