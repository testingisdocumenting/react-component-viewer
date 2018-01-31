import * as React from 'react';
import { LayoutProps } from './LayoutProps';

import './TabsLayout.css';

export function TabsLayout(props: LayoutProps) {
    return (
        <div className="tabs-layout">
            <TabsHeader {...props}/>
            <SelectedTabContent {...props}/>
        </div>
    );
}

function TabsHeader({selectedDescription, instancesWithDescription, onSelect}: LayoutProps) {
    return (
        <div className="tabs-header">
            {instancesWithDescription.data.map(withDescription => {
                const isSelected = withDescription.description === selectedDescription;
                return (
                    <TabHeader
                        key={withDescription.description}
                        name={withDescription.description}
                        isSelected={isSelected}
                        onSelect={onSelect}
                    />);
            })}
        </div>
    );
}

function SelectedTabContent({selectedDescription, instancesWithDescription}: LayoutProps) {
    const instance = instancesWithDescription.findByDescription(selectedDescription);

    return (
        <div className="tab-content">
            {instance}
        </div>
    );
}

interface TabHeaderProps {
    name: string;
    isSelected: boolean;
    onSelect: (name: string) => void;
}

function TabHeader({name, isSelected, onSelect}: TabHeaderProps) {
    const className = 'tab-header' + (isSelected ? ' selected' : '');
    return (
        <div className={className} onClick={() => onSelect(name)}>
            {name}
        </div>
    );
}