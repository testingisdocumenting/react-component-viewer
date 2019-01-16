export class StateChangeListeners {
    private listeners: Array<() => void> = [];

    addListener(listener: () => void) {
        this.listeners.push(listener);
    }

    removeListener(listener: () => void) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    notify() {
        this.listeners.forEach(l => l());
    }
}

export const stateChangeListener = new StateChangeListeners();