import { actionsListener } from './ActionsListener';

export function simpleAction(label: string) {
    return () => {
        actionsListener.notify(label);
        console.log('action triggered: ' + label);
    };
}