import * as React from 'react';

import { DemoInstance } from './DemoInstance';
import { DemoInstancesGroup } from './DemoInstancesGroup';

export class DemoInstances {
    groups: DemoInstancesGroup[] = [];
    all: DemoInstance[] = [];
    currentGroup: DemoInstancesGroup;

    constructor() {
        this.createNewGroup('');
    }

    description(description: string) {
        if (this.currentGroup.isEmpty()) {
            this.currentGroup.description = description;
        } else {
            this.createNewGroup(description);
        }
    }

    add(title: string, description: string, component: React.ComponentType) {
        if (this.all.filter(ni => ni.title === title).length) {
            throw new Error(`element with "${title}" title is already registered`);
        }

        const newEntry = {title, description, component};
        this.all.push(newEntry);
        this.currentGroup.data.push(newEntry);
    }

    findByTitle(title: string): DemoInstance {
        const found = this.all.filter(instance => instance.title === title);
        if (! found.length) {
            throw new Error('cannot find demo instance with "' + title + '" title');
        }

        return found[0];
    }

    private createNewGroup(description: string) {
        this.currentGroup = new DemoInstancesGroup(description);
        this.groups.push(this.currentGroup);
    }
}