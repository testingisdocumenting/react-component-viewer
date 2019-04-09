import * as React from 'react';

import { ToolbarDropDownSelectionPlacement } from './ToolbarDropDownSelectionPlacement';
import { ToolbarDropDownSelectionItem } from './ToolbarDropDownSelectionItem';

import { DropDown } from '../dropdown/DropDown';

import './ToolbarDropDown.css';

export interface Props {
    dropDown: DropDown;
    selectedLabelKey?: string;

    onItemSelect(dropDownLabel: string, itemLabel: string): void;
}

export interface State {
    selectionVisible: boolean;
}

export class ToolbarDropDown extends React.Component<Props, State> {
    state: State = {
        selectionVisible: false
    };

    private selectedLabelNode: HTMLElement;

    render() {
        const {dropDown} = this.props;

        return (
            <div className="rcv-toolbar-drop-down">
                <div className="rcv-toolbar-drop-down-label">{dropDown.label}</div>
                {this.renderSelected()}
                {this.renderSelectionIfRequired()}
            </div>
        );
    }

    private saveSelectedLabelNode = (node: HTMLDivElement) => {
        this.selectedLabelNode = node;
    }

    private renderSelectionIfRequired() {
        const {selectionVisible} = this.state;
        return selectionVisible ?
            this.renderSelection() :
            null;
    }

    private renderSelection() {
        const {dropDown} = this.props;

        return (
            <ToolbarDropDownSelectionPlacement parent={this.selectedLabelNode}>
                <div className="rcv-toolbar-drop-down-selection">
                    {dropDown.items.map(item =>
                        <ToolbarDropDownSelectionItem key={item.label} item={item} onItemSelect={this.onItemSelect}/>)}
                </div>
            </ToolbarDropDownSelectionPlacement>
        );
    }

    private onItemSelect = (itemLabel: string) => {
        const {dropDown, onItemSelect} = this.props;

        this.setState({
            selectionVisible: false
        });

        onItemSelect(dropDown.label, itemLabel);
    }

    private renderSelected() {
        const {selectedLabelKey, dropDown} = this.props;

        const labelToRender = buildLabelToRender(selectedLabelKey);
        return (
            <div
                className="rcv-toolbar-drop-down-selected-label"
                ref={this.saveSelectedLabelNode}
                onClick={this.toggleSelection}
            >
                {labelToRender}
            </div>
        );

        function buildLabelToRender(key?: string) {
            const nothingSelectedLabel = 'Select...';

            if (!key) {
                return nothingSelectedLabel;
            }

            const found = dropDown.findItemByLabelKey(key);
            return found ? found.label : nothingSelectedLabel;
        }
    }

    private toggleSelection = () => {
        this.setState(prev => ({selectionVisible: !prev.selectionVisible}));
    }
}
