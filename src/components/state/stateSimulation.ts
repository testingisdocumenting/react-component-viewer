import { stateChangeListener } from './StateChangeListeners';

export function simulateState<T>(initial: T): [() => T, (v: T) => void] {
    const holder = {
        value: initial
    };

    return [
        () => holder.value,
        (newValue: T) => {
            holder.value = newValue;
            refreshComponents();
        }
    ];
}

export function refreshComponents() {
    stateChangeListener.notify();
}