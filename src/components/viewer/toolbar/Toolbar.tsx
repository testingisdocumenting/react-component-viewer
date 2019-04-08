import * as React from 'react';

import { ToolbarDropDown } from './ToolbarDropDown';

import { ComponentViewerDropDown } from '../ComponentViewerDropDown';

import { labelToKey } from './labelUtils';

import './Toolbar.css';

export interface Props {
    dropDowns: ComponentViewerDropDown[];
    selectedItems: {[label: string]: string};
    questionMarkToggledOn: boolean;
    onDropDownItemSelection?(dropDownLabel: string, itemLabel: string): void;
    onQuestionMarkClick(): void;
}

export class Toolbar extends React.PureComponent<Props> {
    render() {
        const {
            dropDowns,
            selectedItems,
            questionMarkToggledOn,
            onQuestionMarkClick
        } = this.props;

        const questionMarkClassName = 'rcv-toolbar-action' + (questionMarkToggledOn ? ' on' : '');
        return (
            <div className="rcv-toolbar">
                {dropDowns.map(dropDown => <ToolbarDropDown
                    key={dropDown.label}
                    label={dropDown.label}
                    items={dropDown.items}
                    selectedLabelKey={selectedItems[labelToKey(dropDown.label)]}
                    onItemSelect={this.onDropDownItemSelection}
                />)}
                <div
                    className={questionMarkClassName}
                    onClick={onQuestionMarkClick}
                >
                    ?
                </div>
            </div>
        );
    }

    private onDropDownItemSelection = (dropDownLabel: string, itemLabel: string) => {
        const {onDropDownItemSelection} = this.props;
        if (onDropDownItemSelection) {
            onDropDownItemSelection(dropDownLabel, itemLabel);
        }
    }
}