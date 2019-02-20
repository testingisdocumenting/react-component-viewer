import * as React from 'react';

import { ToolbarDropDownItem } from './ToolbarDropDownItem';

import { ToolbarDropDownSelectionPlacement } from './ToolbarDropDownSelectionPlacement';
import { ToolbarDropDownSelectionItem } from './ToolbarDropDownSelectionItem';

import './ToolbarDropDown.css';

export interface Props {
    label: string;
    selectedLabel?: string;
    items: ToolbarDropDownItem[];

    onItemSelect(label: string): void;
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
        const {label} = this.props;

        return (
            <div className="rcv-toolbar-drop-down">
                <div className="rcv-toolbar-drop-down-label">{label}</div>
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
        const {items} = this.props;

        return (
            <ToolbarDropDownSelectionPlacement parent={this.selectedLabelNode}>
                <div className="rcv-toolbar-drop-down-selection">
                    {items.map(item =>
                        <ToolbarDropDownSelectionItem key={item.label} item={item} onItemSelect={this.onItemSelect}/>)}
                </div>
            </ToolbarDropDownSelectionPlacement>
        );
    }

    private onItemSelect = (label: string) => {
        const {onItemSelect} = this.props;

        this.setState({
            selectionVisible: false
        });

        onItemSelect(label);
    }

    private renderSelected() {
        const {selectedLabel} = this.props;

        const labelToRender = selectedLabel ? selectedLabel : 'Select...';
        return (
            <div
                className="rcv-toolbar-drop-down-selected-label"
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