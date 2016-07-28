export interface IStateListener {
    onStateChanged(): void;
}

export interface IStateNotifier {
    subscribe(listener: IStateListener): void;
    notify(): void;
}