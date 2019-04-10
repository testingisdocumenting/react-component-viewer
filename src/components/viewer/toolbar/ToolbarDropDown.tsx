import * as React from 'react';

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
    private dropDownNode: HTMLElement;

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

    componentDidMount() {
        document.addEventListener('mousedown', this.onGlobalClick);
    }

    componentWillUnmount() {
        document.addEventListener('mouseup', this.onGlobalClick);
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
            <div
                className="rcv-toolbar-drop-down-selection-placement"
                style={this.dropDownSelectionStyle()}
                ref={this.saveDropDownNode}
            >
                <div className="rcv-toolbar-drop-down-selection">
                    {dropDown.items.map(item =>
                        <ToolbarDropDownSelectionItem key={item.label} item={item} onItemSelect={this.onItemSelect}/>)}
                </div>
            </div>
        );
    }

    private saveDropDownNode = (node: HTMLDivElement) => {
        this.dropDownNode = node;
    }

    private dropDownSelectionStyle = () => {
        const pos = this.selectedLabelNode.getBoundingClientRect();

        return {
            left: pos.left,
            top: pos.top
        };
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

    private hideSelection = () => {
        this.setState({selectionVisible: false});
    }

    private onGlobalClick = (e: any) => {
        if (this.dropDownNode &&
            this.selectedLabelNode &&
            !this.dropDownNode.contains(e.target) &&
            !this.selectedLabelNode.contains(e.target)) {
            this.hideSelection();
        }
    }
}
