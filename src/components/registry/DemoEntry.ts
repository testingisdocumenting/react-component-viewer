import * as React from 'react';

import { LayoutProps } from '../layouts/LayoutProps';
import { DemoInstances } from './DemoInstances';
import { DemoInstance } from './DemoInstance';

export class DemoEntry {
    name: string;
    layoutComponent: React.ComponentType<LayoutProps>;
    layoutOpts: object;
    demoInstances: DemoInstances;
    urlRegexp?: RegExp;

    constructor(name: string,
                layoutInstance: React.ComponentType<LayoutProps>,
                urlRegexp: RegExp | undefined,
                layoutOpts: object) {
        this.name = name;
        this.layoutComponent = layoutInstance;
        this.urlRegexp = urlRegexp;
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

    findNextInstanceByCurrentTitle(title: string): DemoInstance {
        return this.demoInstances.findNextInstanceByCurrentTitle(title);
    }

    findPrevInstanceByCurrentTitle(title: string): DemoInstance {
        return this.demoInstances.findPrevInstanceByCurrentTitle(title);
    }

    isMiniApp(): boolean {
        return !!this.urlRegexp;
    }

    get firstEntryTitle(): string {
        return this.demoInstances.all[0].title;
    }
}