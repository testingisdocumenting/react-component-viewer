import * as React from 'react';

import { LayoutProps } from './LayoutProps';
import { AllItemsAtOnceLayoutBase } from './AllItemsAtOnceLayoutBase';

import { DescriptionAndInstanceLayoutItem } from './DescriptionAndInstanceLayoutItem';

import './GridLayout.css';

const GridItem = DescriptionAndInstanceLayoutItem('grid-item');

export function GridLayout({selectedTitle, instancesWithDescription, onSelect}: LayoutProps) {
    return (
        <AllItemsAtOnceLayoutBase
            topLevelClassName="grid-layout"
            selectedTitle={selectedTitle}
            instancesWithDescription={instancesWithDescription}
            onSelect={onSelect}
            LayoutItemComponent={GridItem}
        />
    );
}
