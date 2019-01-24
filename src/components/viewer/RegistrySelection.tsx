import * as React from 'react';

import './RegistrySelection.css';

export interface Props {
    names: string[];
    selectedName: string;
    onSelect: (name: string) => void;
}

export class RegistrySelection extends React.PureComponent<Props> {
    render() {
        const {names, selectedName, onSelect} = this.props;

        return (
            <div className="rcv-registry-selection">
                {names.map(name => {
                    const isSelected = name === selectedName;
                    const className = 'rcv-registry-selection-tab ' + (isSelected ? ' selected' : '');

                    return (
                        <div key={name} className={className} onClick={() => onSelect(name)}>
                            {name}
                        </div>
                    );
                })}
            </div>
        );
    }
}
