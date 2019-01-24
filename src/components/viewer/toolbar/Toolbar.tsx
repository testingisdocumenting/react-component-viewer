import * as React from 'react';

import { FullScreenIcon } from './FullScreenIcon';
import { ToolbarDropDown } from './ToolbarDropDown';
import { ToolbarDropDownItem } from './ToolbarDropDownItem';

import './Toolbar.css';

export interface Props {
    dropDownLabel?: string;
    dropDownItems?: ToolbarDropDownItem[];
    dropDownSelected?: string;
    onDropDownItemSelection?(label: string): void;
    onFullScreen(): void;
}

export class Toolbar extends React.PureComponent<Props> {
    render() {
        const {dropDownLabel, dropDownItems, dropDownSelected, onFullScreen} = this.props;

        return (
            <div className="rcv-toolbar">
                {dropDownItems && dropDownItems.length > 0 && <ToolbarDropDown
                    label={dropDownLabel || ''}
                    items={dropDownItems}
                    selectedLabel={dropDownSelected}
                    onItemSelect={this.onDropDownItemSelection}
                />}
                <div
                    className="rcv-toolbar-action"
                    title="Full Screen (Alt+F)"
                    onClick={onFullScreen}
                >
                    <FullScreenIcon/>
                </div>
            </div>
        );
    }

    private onDropDownItemSelection = (label: string) => {
        const {onDropDownItemSelection} = this.props;
        if (onDropDownItemSelection) {
            onDropDownItemSelection(label);
        }
    }
}