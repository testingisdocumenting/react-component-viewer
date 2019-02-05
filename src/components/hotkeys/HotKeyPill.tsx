import * as React from 'react';

import './HotKeyPill.css';

export interface Props {
    hotKey: string;
}

export function HotKeyPill({hotKey}: Props) {
    return (
        <div className="rcv-hotkey-pill">
            {hotKey}
        </div>
    );
}