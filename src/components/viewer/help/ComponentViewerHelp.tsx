import * as React from 'react';

import { globalActionDefaultKeys, globalActionDescription } from '../GlobalActions';
import { HotKeyPill } from '../../hotkeys/HotKeyPill';

import './ComponentViewerHelp.css';

export function ComponentViewerHelp() {
    return (
        <div className="rcv-component-viewer-help">
            <h1>Hotkeys</h1>
            <table className="rcv-component-viewer-help-hotkeys-grid">
                <tbody>
                {Object.keys(globalActionDefaultKeys).map(actionKey =>
                    <HotKeyAndDescription
                        key={actionKey}
                        actionKey={actionKey}
                    />)}
                </tbody>
            </table>
            <h1>GitHub</h1>
            <a href="https://github.com/TestingIsDocumenting/react-component-viewer" target="_blank">Repository</a>
        </div>
    );
}

interface HotKeyAndDescriptionProps {
    actionKey: string;
}

function HotKeyAndDescription({actionKey}: HotKeyAndDescriptionProps) {
    return (
        <tr>
            <td>
                <HotKeyPill hotKey={globalActionDefaultKeys[actionKey]}/>
            </td>
            <td>
                <div>{globalActionDescription[actionKey]}</div>
            </td>
        </tr>
    );
}
