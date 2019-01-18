import * as React from 'react';

import { ToolbarDropDownItem } from './ToolbarDropDownItem';

import './ToolbarDropDown.css';
import { ToolbarDropDownSelectionPlacement } from './ToolbarDropDownSelectionPlacement';

export interface Props {
    label: string;
    selectedLabel?: string;
    items: ToolbarDropDownItem[];

    onItemSelection(label: string): void;
}

export interface State {
    selectionVisible: boolean;
}

export class ToolbarDropDown extends React.Component<Props, State> {
    state: State = {
        selectionVisible: false
    };

    private _selectedLabelNode: HTMLElement;

    render() {
        const {label} = this.props;

        return (
            <div className="rcw-toolbar-drop-down">
                <div className="rcw-toolbar-drop-down-label">{label}</div>
                {this.renderSelected()}
                {this.renderSelectionIfRequired()}
            </div>
        );
    }

    private saveSelectedLabelNode = (node: HTMLDivElement) => {
        this._selectedLabelNode = node;
    }

    private renderSelectionIfRequired() {
        const {selectionVisible} = this.state;
        return selectionVisible ?
            this.renderSelection() :
            null;
    }

    private renderSelection() {
        const {items} = this.props;

        return (
            <ToolbarDropDownSelectionPlacement parent={this._selectedLabelNode}>
                <div className="rcw-toolbar-drop-down-selection">
                    {items.map(item => (
                        <div
                            key={item.label}
                            className="rcw-toolbar-drop-down-selection-item"
                            onClick={() => this.onItemSelect(item.label)}
                        >
                            {item.label}
                        </div>))}
                </div>
            </ToolbarDropDownSelectionPlacement>
        );
    }

    private onItemSelect(label: string) {
        const {onItemSelection} = this.props;

        this.setState({
            selectionVisible: false
        });

        onItemSelection(label);
    }

    private renderSelected() {
        const {selectedLabel} = this.props;

        const labelToRender = selectedLabel ? selectedLabel : 'Select...';
        return (
            <div
                className="rcw-toolbar-drop-down-selected-label"
                ref={this.saveSelectedLabelNode}
                onClick={this.toggleSelection}
            >
                {labelToRender}
            </div>
        );
    }

    private toggleSelection = () => {
        this.setState(prev => ({selectionVisible: !prev.selectionVisible}));
    }
}
