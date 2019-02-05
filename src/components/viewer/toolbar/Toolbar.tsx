import * as React from 'react';

import { ToolbarDropDown } from './ToolbarDropDown';
import { ToolbarDropDownItem } from './ToolbarDropDownItem';

import './Toolbar.css';

export interface Props {
    dropDownLabel?: string;
    dropDownItems?: ToolbarDropDownItem[];
    dropDownSelected?: string;
    questionMarkToggledOn: boolean;
    onDropDownItemSelection?(label: string): void;
    onQuestionMarkClick(): void;
}

export class Toolbar extends React.PureComponent<Props> {
    render() {
        const {
            dropDownLabel,
            dropDownItems,
            dropDownSelected,
            questionMarkToggledOn,
            onQuestionMarkClick
        } = this.props;

        const questionMarkClassName = 'rcv-toolbar-action' + (questionMarkToggledOn ? ' on' : '');
        return (
            <div className="rcv-toolbar">
                {dropDownItems && dropDownItems.length > 0 && <ToolbarDropDown
                    label={dropDownLabel || ''}
                    items={dropDownItems}
                    selectedLabel={dropDownSelected}
                    onItemSelect={this.onDropDownItemSelection}
                />}
                <div
                    className={questionMarkClassName}
                    onClick={onQuestionMarkClick}
                >
                    ?
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