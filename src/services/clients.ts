/// <reference path="../../lib/typings/index.locals.d.ts" />

import { IStore } from "viperx"
import * as Promise from "bluebird"
import * as FetchBluebird from "fetch-bluebird"
import { IAppState } from "./../models/state"
import { Client } from "./../models/client"

export interface IClientsService {
    fetch(start: number, end: number): Promise<IFetchedData>;
    getAll(): Array<Client>;
    add(client: Client): Promise<Client>;
    delete(clientId: number): Promise<any>;
    isFetching(): boolean;
    isAdding(): boolean;
}

export interface IFetchedData {
    clients: Array<Client>;
    totalClients: number;
}

export class ClientsService implements IClientsService {

    public constructor(private store: IStore<IAppState>) {
    }

    public fetch(page: number, pageSize: number): Promise<IFetchedData> {
        this.store.dispatch(state => state.isFetching = true);
        var start = (page - 1) * pageSize;
        var end = start + pageSize;
        return this.store.dispatchAsync((state: IAppState, resolve: Function, reject: Function) => {
            fetch(`api/clients?_start=${start}&_end=${end}`)
            .then((response: any) => { 
                return response.json().then((clients: Array<Client>) => {return { clients: clients, totalClients: parseInt(response.headers.get("X-Total-Count")) }});
            })
            .then((data: IFetchedData) => {
                state.clients = data.clients.map((c: Client) => Client.copyFrom(c));
                state.totalClients = data.totalClients;
                state.isFetching = false;
                resolve(state);
            })
            .catch((errors: any) => reject(errors));
        })
        .then((state: IAppState) => {
            return { clients: state.clients, totalClients: state.totalClients };
        });
    }

    public getAll(): Array<Client> {
        return this.store.getState().clients;
    }

    public add(client: Client): Promise<Client> {
        this.store.dispatch((state: IAppState) => state.isAdding = true);
        var addedClient: Client;
        return this.store.dispatchAsync((state: IAppState, resolve: Function, reject: Function) => {
            fetch("api/clients", { 
                method: "POST", 
                headers: { 
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(client) 
            })
            .then((response: any) => response.json())
            .then((newClient: Client) => {
                addedClient = newClient;
                state.clients.push(Client.copyFrom(addedClient));
                state.isAdding = false;
                resolve(state);
            })
            .catch((errors: any) => reject(errors));
        })
        .then((state: IAppState) => addedClient);
    }

    public delete(clientId: number): Promise<any> {
        this.store.dispatch((state: IAppState) => state.clients.filter((c: Client) => c.id === clientId)[0].isDeleting = true);
        return this.store.dispatchAsync((state: IAppState, resolve: Function, reject: Function) => {
            fetch("api/clients/" + clientId, { 
                method: "DELETE", 
                headers: { 
                    "Content-Type": "application/json"
                }
            })
            .then((response: any) => response.json())
            .then(() => {
                state.clients = state.clients.filter((c: Client) => c.id !== clientId);
                resolve(state);
            })
            .catch((errors: any) => reject(errors)); 
        })
        .then(() => {});
    }

    public isFetching(): boolean {
        return this.store.getState().isFetching;
    }

    public isAdding(): boolean {
        return this.store.getState().isAdding;
    }
}