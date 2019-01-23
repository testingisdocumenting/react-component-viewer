import * as React from 'react';

import { ToolbarDropDownItem } from './ToolbarDropDownItem';

import { ToolbarDropDownSelectionPlacement } from './ToolbarDropDownSelectionPlacement';
import { GlobalHotKeysHandler } from '../../hotkeys/GlobalHotKeysHandler';

import { HotKeyBoundActions } from '../../hotkeys/HotKeyBoundActions';

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
            <div className="rcw-toolbar-drop-down">
                <GlobalHotKeysHandler keyBoundActions={this.hotKeyBoundActions()}/>

                <div className="rcw-toolbar-drop-down-label">{label}</div>
                {this.renderSelected()}
                {this.renderSelectionIfRequired()}
            </div>
        );
    }

    private hotKeyBoundActions(): HotKeyBoundActions {
        const result: HotKeyBoundActions = {};

        const {items} = this.props;
        items
            .filter(item => !!item.hotKey)
            .forEach(item => result[item.hotKey!] = () => this.onItemSelect(item.label));

        return result;
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
                <div className="rcw-toolbar-drop-down-selection">
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
