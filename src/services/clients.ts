/// <reference path="../../lib/typings/index.locals.d.ts" />

import { IStore } from "viperx"
import * as Promise from "bluebird"
import * as FetchBluebird from "fetch-bluebird"
import { IAppState } from "./../models/state"
import { Client } from "./../models/client"

export interface IClientsService {
    fetch(): Promise<Array<Client>>;
    getAll(): Array<Client>;
    add(client: Client): Promise<Client>;
    delete(clientId: number): Promise<any>;
    isFetching(): boolean;
    isAdding(): boolean;
}

export class ClientsService implements IClientsService {

    public constructor(private store: IStore<IAppState>) {
    }

    public fetch(): Promise<Array<Client>> {
        this.store.dispatch(state => state.isFetching = true);
        return this.store.dispatchAsync((state: IAppState, resolve: Function, reject: Function) => {
            fetch("api/clients")
            .then((response: any) => response.json())
            .then((clients: Array<any>) => {
                state.clients = clients.map((c: Client) => Client.copyFrom(c));
                state.isFetching = false;
                resolve(state);
            })
            .catch((errors: any) => reject(errors));
        })
        .then((state: IAppState) => {
            return state.clients;
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