import * as React from 'react';

import { DemoEntry } from './DemoEntry';
import { GridLayout, LayoutProps, TabsLayout } from '../';
import { LabelInstanceTableLayout } from '../layouts/LabelInstanceTableLayout';
import { SingleItemLayout } from '../layouts/SingleItemLayout';

class Registry {
    _usedNames: string[] = [];

    _componentsInstances: DemoEntry[] = [];
    _currentInstances?: DemoEntry;

    registerAsGrid(name: string) {
        return this.register(name, GridLayout);
    }

    registerAsTabs(name: string) {
        return this.register(name, TabsLayout);
    }

    registerAsTwoColumnTable(name: string) {
        return this.register(name, LabelInstanceTableLayout);
    }

    registerSingle(name: string, componentInstance: JSX.Element) {
        this.register(name, SingleItemLayout);
        this.add('', componentInstance);

        return this;
    }

    register(name: string, layoutComponent: React.StatelessComponent<LayoutProps>) {
        if (this._usedNames.indexOf(name) !== -1) {
            throw new Error(`name ${name} was already used`);
        }

        this._currentInstances = new DemoEntry(name, layoutComponent);
        this._componentsInstances.push(this._currentInstances);

        this._usedNames.push(name);

        return this;
    }

    get names(): string[] {
        return this._usedNames;
    }

    add(title: string, componentInstance: JSX.Element) {
        if (this._currentInstances) {
            this._currentInstances.add(title, '', componentInstance);
        } else {
            throw new Error('call register method prior adding elements');
        }

        return this;
    }

    findByName(name: string): DemoEntry {
        const byName = this._componentsInstances
            .filter(instances => instances.name === name);

        if (byName.length === 0) {
            throw new Error(`cannot find components by name: ${name}`);
        }

        return byName[0];
    }
}

export { Registry };