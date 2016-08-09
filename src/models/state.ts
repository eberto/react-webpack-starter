import { IState } from "viperx"
import { Client } from "./../models/client"

export interface IAppState extends IState {
    
    clients: Array<Client>;
    isFetching?: boolean;
    isAdding?: boolean;
}