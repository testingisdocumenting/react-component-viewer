import * as React from 'react';

import { LayoutProps } from './LayoutProps';

import './GridLayout.css';

export function GridLayout({selectedDescription, instancesWithDescription, onSelect}: LayoutProps) {
    return (
        <div className="grid-layout">
            {instancesWithDescription.data.map(withDescription =>
                <GridItem
                    key={withDescription.description}
                    description={withDescription.description}
                    instance={withDescription.instance}
                    isSelected={selectedDescription === withDescription.description}
                    onSelect={onSelect}
                />
            )}
        </div>
    );
}

interface GridItemProps {
    description: string;
    instance: JSX.Element;
    isSelected: boolean;
    onSelect: (description: string) => void;
}

function GridItem({description, instance, isSelected, onSelect}: GridItemProps) {
    const descriptionClassName = 'description' + (isSelected ? ' selected' : '');

    return (
        <div className="grid-item">
            <div className={descriptionClassName} onClick={() => onSelect(description)}>
                {description}
            </div>
            <div className="instance">
                {instance}
            </div>
        </div>
    );
}