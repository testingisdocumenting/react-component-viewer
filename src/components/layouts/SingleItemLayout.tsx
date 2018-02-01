import * as React from 'react';
import { LayoutProps } from './LayoutProps';

export function SingleItemLayout({selectedTitle, instancesWithDescription}: LayoutProps) {
    return (
        <div className="single-item-layout">
            {instancesWithDescription.data[0].instance}
        </div>
    );
}