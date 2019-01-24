import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './ToolbarDropDownSelectionPlacement.css';

const selectionId = 'rcv-toolbar-drop-down-selection-placement';

export interface Props {
    parent: HTMLElement;
    children: JSX.Element | JSX.Element[];
}

export class ToolbarDropDownSelectionPlacement extends React.Component<Props> {
    private _node: HTMLElement;

    constructor(props: Props) {
        super(props);
        this.createDivIfRequired();
    }

    render() {
        const {children} = this.props;

        return ReactDOM.createPortal(
            children,
            document.getElementById(selectionId)!
        );
    }

    private createDivIfRequired() {
        const {parent} = this.props;

        let selectionDiv = document.getElementById(selectionId);
        if (!selectionDiv) {
            selectionDiv = document.createElement('div');
            selectionDiv.id = selectionId;
            document.body.appendChild(selectionDiv);
        }

        const pos = parent.getBoundingClientRect();

        this._node = selectionDiv;
        this._node.style.left = pos.left + 'px';
        this._node.style.top = (pos.top + 24) + 'px';
    }
}