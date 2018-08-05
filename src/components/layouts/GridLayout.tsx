import * as React from 'react';

import { LayoutProps } from './LayoutProps';
import { AllItemsAtOnceLayoutBase } from './AllItemsAtOnceLayoutBase';
import { DescriptionAndInstanceLayoutItem } from './DescriptionAndInstanceLayoutItem';

import './GridLayout.css';

interface GridLayoutOpts {
    minWidth: number;
}

export function GridLayout({selectedTitle, demoInstancesGroup, layoutOpts, onSelect}: LayoutProps) {
    const opts = layoutOpts as GridLayoutOpts;
    const widthToUse = opts && opts.minWidth > 0 ?
        `repeat(auto-fill, minmax(${opts.minWidth}px, 1fr))` :
        '1fr';

    const style = {
        gridTemplateColumns: widthToUse
    };

    return (
        <AllItemsAtOnceLayoutBase
            style={style}
            topLevelClassName="rcw-grid-layout"
            selectedTitle={selectedTitle}
            demoInstancesGroup={demoInstancesGroup}
            onSelect={onSelect}
            LayoutItemComponent={DescriptionAndInstanceLayoutItem}
        />
    );
}
