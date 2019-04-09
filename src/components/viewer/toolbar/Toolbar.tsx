import * as React from 'react';

import { ToolbarDropDown } from './ToolbarDropDown';

import { DropDowns } from '../dropdown/DropDowns';

import './Toolbar.css';

export interface Props {
    dropDowns: DropDowns;
    selectedItems: {[labelKey: string]: string};
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
                {dropDowns.list.map(dropDown => <ToolbarDropDown
                    key={dropDown.label}
                    dropDown={dropDown}
                    selectedLabelKey={selectedItems[dropDown.labelKey]}
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