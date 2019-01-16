import * as React from 'react';

import { LayoutProps } from '../layouts/LayoutProps';
import { DemoInstances } from './DemoInstances';
import { DemoInstance } from './DemoInstance';

export class DemoEntry {
    name: string;
    layoutComponent: React.ComponentType<LayoutProps>;
    layoutOpts: object;
    demoInstances: DemoInstances;
    urlPrefix: string;

    constructor(name: string, layoutInstance: React.ComponentType<LayoutProps>, urlPrefix: string, layoutOpts: object) {
        this.name = name;
        this.layoutComponent = layoutInstance;
        this.urlPrefix = urlPrefix;
        this.layoutOpts = layoutOpts;
        this.demoInstances = new DemoInstances();
    }

    add(title: string, description: string, instance: React.ComponentType) {
        this.demoInstances.add(title, description, instance);
    }

    description(description: string) {
        this.demoInstances.description(description);
    }

    findByTitle(title: string): DemoInstance {
        return this.demoInstances.findByTitle(title);
    }

    isMiniApp(): boolean {
        return this.urlPrefix.length > 0;
    }

    get firstEntryTitle(): string {
        return this.demoInstances.all[0].title;
    }
}