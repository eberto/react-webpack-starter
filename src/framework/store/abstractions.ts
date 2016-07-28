export interface IState {
}

export interface IListener {

    onStateChanged(): void;
}

export interface IAction {

    execute(state: IState): IState;
}

export interface IAsyncAction {

    execute(state: IState, resolve: (value?: IState) => void, reject: (errors?: any) => void): void;
}

export interface ICloner {

    clone(source: any): any;
}

export interface IStore {

    subscribe(listener: IListener): void;
    dispatch(action: IAction): void;
    dispatchAsync(action: IAsyncAction): void;
    getState<TState extends IState>(): TState;
}