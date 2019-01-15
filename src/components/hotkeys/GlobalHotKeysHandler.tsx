import * as React from 'react';
import { HotKey } from './HotKey';
import { hotKeyFromString } from './hotKeyBuilder';
import { HotKeyBoundActions } from './HotKeyBoundActions';

export interface Props {
    keyBoundActions: HotKeyBoundActions;
}

export class GlobalHotKeysHandler extends React.Component<Props> {
    private actionsWithHotKey: Array<{key: HotKey, action: () => void}>;

    constructor(props: Props) {
        super(props);

        this.actionsWithHotKey = Object.keys(props.keyBoundActions).map(key => ({
            key: hotKeyFromString(key),
            action: props.keyBoundActions[key]
        }));
    }

    render() {
        return null;
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    private onKeyDown = (e: KeyboardEvent) => {
        const keyBoundAction = this.findKeyBoundAction(e);
        if (keyBoundAction) {
            keyBoundAction.action();
        }
    }

    private findKeyBoundAction(e: KeyboardEvent) {
        const found = this.actionsWithHotKey.filter(boundAction => matchKey(e, boundAction.key));
        return found.length > 0 ? found[0] : null;
    }
}

function matchKey(keyEvent: KeyboardEvent, hotKet: HotKey) {
    return keyEvent.code === hotKet.code &&
        keyEvent.altKey === hotKet.alt &&
        keyEvent.shiftKey === hotKet.shift &&
        keyEvent.ctrlKey === hotKet.ctrl &&
        keyEvent.metaKey === hotKet.meta;
}