import * as React from 'react';

import { ToolbarDropDownItem } from './ToolbarDropDownItem';

import './ToolbarDropDownSelectionItem.css';

export interface Props {
    item: ToolbarDropDownItem;
    onItemSelect(label: string): void;
}

export function ToolbarDropDownSelectionItem({item, onItemSelect}: Props) {
    return (
        <div
            key={item.label}
            className="rcw-toolbar-drop-down-selection-item"
            onClick={() => onItemSelect(item.label)}
        >
            <div className="rcw-toolbar-drop-down-selection-item-label">
                {item.label}
            </div>

            {item.hotKey && <div className="rcw-toolbar-drop-down-selection-item-hotkey">
                {item.hotKey}
            </div>}
        </div>
    );
}