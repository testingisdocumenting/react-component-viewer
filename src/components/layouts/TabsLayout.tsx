import * as React from 'react';
import { LayoutProps } from './LayoutProps';

import './TabsLayout.css';

export function TabsLayout(props: LayoutProps) {
    return (
        <div className="rcv-tabs-layout">
            <TabsHeader {...props}/>
            <SelectedTabContent {...props}/>
        </div>
    );
}

function TabsHeader({selectedTitle, demoInstancesGroup, onSelect}: LayoutProps) {
    return (
        <div className="rcv-tabs-layout-tabs-header">
            {demoInstancesGroup.data.map(withDescription => {
                const isSelected = withDescription.title === selectedTitle;
                return (
                    <TabHeader
                        key={withDescription.title}
                        name={withDescription.title}
                        isSelected={isSelected}
                        onSelect={onSelect}
                    />);
            })}
        </div>
    );
}

function SelectedTabContent({selectedTitle, demoInstancesGroup}: LayoutProps) {
    const Component = demoInstancesGroup.findByTitle(selectedTitle);

    return (
        <div className="tab-content">
            <Component/>
        </div>
    );
}

interface TabHeaderProps {
    name: string;
    isSelected: boolean;
    onSelect: (name: string) => void;
}

function TabHeader({name, isSelected, onSelect}: TabHeaderProps) {
    const className = 'rcv-tabs-layout-tab-header' + (isSelected ? ' selected' : '');
    return (
        <div className={className} onClick={() => onSelect(name)}>
            {name}
        </div>
    );
}