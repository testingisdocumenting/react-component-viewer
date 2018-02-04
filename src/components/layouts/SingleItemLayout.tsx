import * as React from 'react';
import { LayoutProps } from './LayoutProps';

export function SingleItemLayout({selectedTitle, demoInstancesGroup}: LayoutProps) {
    return (
        <div className="single-item-layout">
            {demoInstancesGroup.data[0].instance}
        </div>
    );
}