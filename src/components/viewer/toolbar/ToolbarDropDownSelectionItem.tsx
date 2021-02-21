import * as React from 'react';

import { HotKeyPill } from '../../hotkeys/HotKeyPill';
import { DropDownItem } from '../dropdown/DropDownItem';

export interface Props {
    item: DropDownItem;
    onItemSelect(label: string): void;
}

export function ToolbarDropDownSelectionItem({item, onItemSelect}: Props) {
    return (
        <div
            key={item.label}
            className="rcv-toolbar-drop-down-selection-item"
            onClick={() => onItemSelect(item.label)}
        >
            <div className="rcv-toolbar-drop-down-selection-item-label">
                {item.label}
            </div>

            {item.hotKey && <HotKeyPill hotKey={item.hotKey}/>}
        </div>
    );
}