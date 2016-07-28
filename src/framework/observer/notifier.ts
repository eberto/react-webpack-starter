import { IStateListener, IStateNotifier } from "./"

export class StateNotifier implements IStateNotifier {

    private listeners: Array<IStateListener> = [];

    public subscribe(listener: IStateListener): void {
        this.listeners.push(listener);
    }

    public notify(): void {
        this.listeners.forEach((listener: IStateListener) => {
            listener.onStateChanged();
        });
    }
}