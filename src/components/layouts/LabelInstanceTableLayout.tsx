import * as React from 'react';

import { LayoutProps } from './LayoutProps';
import { AllItemsAtOnceLayoutBase } from './AllItemsAtOnceLayoutBase';

import { DescriptionAndInstanceLayoutItem } from './DescriptionAndInstanceLayoutItem';

import './LabelInstanceTableLayout.css';

const GridItem = DescriptionAndInstanceLayoutItem('table-item');

export function LabelInstanceTableLayout({selectedTitle, instancesWithDescription, onSelect}: LayoutProps) {
    return (
        <AllItemsAtOnceLayoutBase
            topLevelClassName="rcw-label-instance-table-layout"
            selectedTitle={selectedTitle}
            instancesWithDescription={instancesWithDescription}
            onSelect={onSelect}
            LayoutItemComponent={GridItem}
        />
    );
}
