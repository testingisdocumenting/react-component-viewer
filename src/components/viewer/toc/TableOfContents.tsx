import * as React from 'react';

import { TocItem } from './TocItem';

import './TableOfContents.css';

export interface TocProps {
    names: string[];
    selectedName: string;
    onSelect: (name: string) => void;
}

export class TableOfContents extends React.PureComponent<TocProps> {
    render() {
        const {names, selectedName, onSelect} = this.props;

        return (
            <div className="rcv-toc">
                {names.map(name => {
                    const isSelected = selectedName === name;

                    return (
                        <TocItem key={name} name={name} isSelected={isSelected} onSelect={onSelect}/>
                    );
                })}
            </div>
        );
    }
}
