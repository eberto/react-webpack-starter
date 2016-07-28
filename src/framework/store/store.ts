/// <reference path="../../../lib/typings/index.d.ts" />

import { Promise } from "es6-promise"
import { IState, IAction, IAsyncAction, ICloner, IStore } from "./"
import { IStateNotifier } from "./../observer"

export class Store implements IStore {

    private state: IState;

    private cloneState() {
        return this.cloner.clone(this.state);
    }

    private updateState(state: IState) {
        this.state = this.cloner.clone(state);
        this.notifier.notify();
    }

    public constructor(initialState: IState, private cloner: ICloner, private notifier: IStateNotifier) {
        this.state = this.cloner.clone(initialState);
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