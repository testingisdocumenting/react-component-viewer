import * as React from 'react';

import { globalActionDefaultKeys, globalActionDescription } from '../GlobalActions';
import { HotKeyPill } from '../../hotkeys/HotKeyPill';

import './ComponentViewerHelp.css';

export function ComponentViewerHelp() {
    return (
        <div className="rcv-component-viewer-help">
            <h1>Hotkeys</h1>
            <div className="rcv-component-viewer-help-hotkeys-grid">
                {Object.keys(globalActionDefaultKeys).map(actionKey =>
                    <HotKeyAndDescription
                        key={actionKey}
                        actionKey={actionKey}
                    />)}
            </div>
            <h1>GitHub</h1>
            <a href="https://github.com/MykolaGolubyev/react-component-viewer" target="_blank">Repository</a>
        </div>
    );
}

interface HotKeyAndDescriptionProps {
    actionKey: string;
}

function HotKeyAndDescription({actionKey}: HotKeyAndDescriptionProps) {
    return (
        <React.Fragment>
            <HotKeyPill hotKey={globalActionDefaultKeys[actionKey]}/>
            <div>{globalActionDescription[actionKey]}</div>
        </React.Fragment>
    );
}
