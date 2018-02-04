import * as React from 'react';

import { LayoutProps } from '../layouts/LayoutProps';
import { DemoInstances } from './DemoInstances';

export class DemoEntry {
    name: string;
    layoutComponent: React.StatelessComponent<LayoutProps>;
    demoInstances: DemoInstances;

    constructor(name: string, layoutInstance: React.StatelessComponent) {
        this.name = name;
        this.layoutComponent = layoutInstance;
        this.demoInstances = new DemoInstances();
    }

    add(title: string, description: string, instance: JSX.Element) {
        this.demoInstances.add(title, description, instance);
    }

    description(description: string) {
        this.demoInstances.description(description);
    }
}