import { ActionListener } from './ActionListener';

export class ActionsListener {
    private listeners: ActionListener[] = [];

    add(listener: ActionListener) {
        this.listeners.push(listener);
    }

    remove(listener: ActionListener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    notify(label: string) {
        this.listeners.forEach(l => l.onAction(label));
    }
}

export const actionsListener = new ActionsListener();