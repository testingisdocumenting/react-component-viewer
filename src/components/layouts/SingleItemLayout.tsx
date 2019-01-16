import * as React from 'react';
import { LayoutProps } from './LayoutProps';

export function SingleItemLayout({selectedTitle, demoInstancesGroup}: LayoutProps) {
    const Component = demoInstancesGroup.data[0].component;
    return (
        <div className="rcw-single-item-layout">
            <Component/>
        </div>
    );
}