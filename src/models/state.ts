import { IState } from "viperx"
import { Client } from "./../models/client"

export interface IAppState extends IState {
    
    clients: Array<Client>;
    totalClients: number;
    isFetching?: boolean;
    isAdding?: boolean;
}