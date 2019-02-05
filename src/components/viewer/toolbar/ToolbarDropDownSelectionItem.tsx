import * as React from 'react';

import { ToolbarDropDownItem } from './ToolbarDropDownItem';

import './ToolbarDropDownSelectionItem.css';
import { HotKeyPill } from '../../hotkeys/HotKeyPill';

export interface Props {
    item: ToolbarDropDownItem;
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