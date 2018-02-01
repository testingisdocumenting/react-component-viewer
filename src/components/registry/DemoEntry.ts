import * as React from 'react';

import { LayoutProps } from '../layouts/LayoutProps';
import { InstancesWithDescription } from './InstancesWithDescription';

export class DemoEntry {
    name: string;
    layoutComponent: React.StatelessComponent<LayoutProps>;
    instancesWithDescription: InstancesWithDescription;

    constructor(name: string, layoutInstance: React.StatelessComponent) {
        this.name = name;
        this.layoutComponent = layoutInstance;
        this.instancesWithDescription = new InstancesWithDescription();
    }

    add(title: string, description: string, instance: JSX.Element) {
        this.instancesWithDescription.add(title, description, instance);
    }
}