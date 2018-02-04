import * as React from 'react';

import { LayoutProps } from './LayoutProps';
import { AllItemsAtOnceLayoutBase } from './AllItemsAtOnceLayoutBase';

import { DescriptionAndInstanceLayoutItem } from './DescriptionAndInstanceLayoutItem';

import './GridLayout.css';

const GridItem = DescriptionAndInstanceLayoutItem('grid-item');

export function GridLayout({selectedTitle, demoInstancesGroup, onSelect}: LayoutProps) {
    return (
        <AllItemsAtOnceLayoutBase
            topLevelClassName="rcw-grid-layout"
            selectedTitle={selectedTitle}
            demoInstancesGroup={demoInstancesGroup}
            onSelect={onSelect}
            LayoutItemComponent={GridItem}
        />
    );
}
