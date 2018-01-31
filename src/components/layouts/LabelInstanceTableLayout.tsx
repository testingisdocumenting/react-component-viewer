import * as React from 'react';

import { LayoutProps } from './LayoutProps';
import { AllItemsAtOnceLayoutBase } from './AllItemsAtOnceLayoutBase';

import { DescriptionAndInstanceLayoutItem } from './DescriptionAndInstanceLayoutItem';

import './LabelInstanceTableLayout.css';

const GridItem = DescriptionAndInstanceLayoutItem('table-item');

export function LabelInstanceTableLayout({selectedDescription, instancesWithDescription, onSelect}: LayoutProps) {
    return (
        <AllItemsAtOnceLayoutBase
            topLevelClassName="label-instance-table-layout"
            selectedDescription={selectedDescription}
            instancesWithDescription={instancesWithDescription}
            onSelect={onSelect}
            LayoutItemComponent={GridItem}
        />
    );
}
