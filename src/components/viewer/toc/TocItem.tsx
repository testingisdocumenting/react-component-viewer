import * as React from 'react';

export interface TocItemProps {
    name: string;
    isSelected: boolean;
    onSelect: (name: string) => void;
}

export class TocItem extends React.PureComponent<TocItemProps> {
    render() {
        const {name, isSelected, onSelect} = this.props;
        const className = 'rcv-toc-entry-name' + (isSelected ? ' selected' : '');

        return (
            <div key={name} className={className} onClick={() => onSelect(name)}>
                {name}
            </div>
        );
    }
}
