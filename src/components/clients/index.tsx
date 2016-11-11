/// <reference path="../../../lib/typings/index.d.ts" />

import "./styles/index.scss"

import * as React from "react"
import Paper from "material-ui/Paper"
import { Client } from "./../../models/client"
import {DataTable} from "../material/table/index"
import {TextColumn} from "../material/table/TextColumn"
import {SelectionColumn} from "../material/table/SelectionColumn"
import {ActionsColumn} from "../material/table/ActionsColumn"
import {Pagination} from "../material/table/Pagination"
import { IClientsService } from "./../../services/clients"

export interface IClientsProps {
    className?: string;
    style?: any;
    clientsService: IClientsService;
}

export interface IClientsState {
	totalWidth: number;
    clients: Array<Client>;
    totalClients: number;
}

export class Clients extends React.Component<IClientsProps, IClientsState> {
    
    defaultPageSize: number;

    constructor() {
        super();
        this.defaultPageSize = 10;
        this.state = { totalWidth: 0, clients: [], totalClients: 0 };
    }

    componentDidMount() {
        this.goToPage(1, this.defaultPageSize)
    }

    goToPage(page: number, pageSize: number) {
        this.props.clientsService.fetch(page, pageSize)
        .then(fetchedData => this.setState({
            clients: fetchedData.clients, 
            totalClients: fetchedData.totalClients,
            totalWidth: this.state.totalWidth 
        }));
    }

    render() {
        //After RUC / CI:  <TextColumn headerText="F. Nacimiento" modelProp="birthDate" />
        return (
            <Paper zDepth={1} style={this.props.style}>
                <DataTable title="Clientes" data={this.state.clients}>
                    <SelectionColumn width={66} onSelect={()=>{}} />
                    <TextColumn headerText="Nombre" modelProp="firstName" width="25%" />
                    <TextColumn headerText="Apellido" modelProp="lastName" width="25%" minWidthVisible={341} />
                    <TextColumn headerText="RUC / CI" modelProp="identification" width={90}  minWidthVisible={700} />
                    <TextColumn headerText="Dirección" modelProp="address" width="25%" minWidthVisible={1150} />
                    <TextColumn headerText="Teléfono 1" modelProp="phone1" width={70}  minWidthVisible={600} />
                    <TextColumn headerText="Teléfono 2" modelProp="phone2"  width={70}  minWidthVisible={800} />
                    <TextColumn headerText="Tel. Móvil" modelProp="mobilePhone" width={80} />
                    <TextColumn headerText="Correo E." modelProp="email" width="25%"  minWidthVisible={1000} />
                    <TextColumn headerText="Edad" modelProp="age" width={40}  minWidthVisible={500} bodyCellStyle={{textAlign: "right"}} headerCellStyle={{textAlign: "right"}} />
                    <ActionsColumn onEdit={()=>{}} onDelete={()=>{}} width={90} />
                    <Pagination pageSize={this.defaultPageSize} pageSizes={[10,20,50,75,100]} totalElements={this.state.totalClients} 
                        onBefore={(currentPage, pageSize) => this.goToPage(currentPage, pageSize)} 
                        onNext={(currentPage, pageSize) => this.goToPage(currentPage, pageSize)} 
                        onPageSizeChange={newSize => this.goToPage(1, newSize)} />
                </DataTable>
            </Paper>
        );
    }
}