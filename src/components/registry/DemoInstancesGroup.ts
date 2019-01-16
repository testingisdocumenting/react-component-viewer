import * as React from 'react';

import { DemoInstance } from './DemoInstance';

export class DemoInstancesGroup {
    description: string = '';
    data: DemoInstance[] = [];

    constructor(description: string) {
        this.description = description;
    }

    isEmpty(): boolean {
        return this.data.length === 0;
    }

    findByTitle(title: string): React.ComponentType {
        const found = this.data.filter(item => item.title === title);

        if (found.length === 0) {
            throw new Error(`cannot find instance with '${title}' title`);
        }

        return found[0].component;
    }
}
