/// <reference path="../../../lib/typings/index.d.ts" />

import { Promise } from "es6-promise"
import { IState, IListener, IAction, IAsyncAction, ICloner, IStore } from "./abstractions"

export class Store implements IStore {

    private listeners: Array<IListener> = [];

    private state: IState;

    private cloner: ICloner;

    private notify(): void {
        this.listeners.forEach((listener: IListener) => {
            listener.onStateChanged();
        });
    }

    private cloneState() {
        return this.cloner.clone(this.state);
    }

    private updateState(state: IState) {
        this.state = this.cloner.clone(state);
        this.notify();
    }

    public constructor(initialState: IState, cloner: ICloner) {
        this.cloner = cloner;
        this.state = this.cloner.clone(initialState);
    }

    public subscribe(listener: IListener): void {
        this.listeners.push(listener);
    }

    public dispatch(action: IAction): void {
        var state = action.execute(this.cloneState());
        this.updateState(state);
    }

    public dispatchAsync(action: IAsyncAction): void {
        new Promise<IState>((resolve: (value?: IState) => void, reject: (errors?: any) => void) => {
            action.execute(this.cloneState(), resolve, reject)
        }).then((state: IState) => {
            this.updateState(state);
        });
    }

    public getState<TState extends IState>(): TState {
        return <TState>this.cloner.clone(this.state);
    }
}