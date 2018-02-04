import * as React from 'react';

import { DemoEntry } from './DemoEntry';
import { GridLayout, LayoutProps, TabsLayout } from '../';
import { LabelInstanceTableLayout } from '../layouts/LabelInstanceTableLayout';
import { SingleItemLayout } from '../layouts/SingleItemLayout';

class Registry {
    name: string;
    _usedNames: string[] = [];

    _componentsInstances: DemoEntry[] = [];
    _currentInstances?: DemoEntry;

    constructor(name: string) {
        this.name = name;
    }

    registerAsGrid(name: string, componentsRegistrator: (registry: Registry) => void) {
        return this.register(name, GridLayout, componentsRegistrator);
    }

    registerAsTabs(name: string, componentsRegistrator: (registry: Registry) => void) {
        return this.register(name, TabsLayout, componentsRegistrator);
    }

    registerAsTwoColumnTable(name: string, componentsRegistrator: (registry: Registry) => void) {
        return this.register(name, LabelInstanceTableLayout, componentsRegistrator);
    }

    registerSingle(name: string, componentsRegistrator: (registry: Registry) => void) {
        this.register(name, SingleItemLayout, componentsRegistrator);
        return this;
    }

    register(name: string,
             layoutComponent: React.StatelessComponent<LayoutProps>,
             componentsRegistrator: (registry: Registry) => void) {

        if (this._usedNames.indexOf(name) !== -1) {
            throw new Error(`name ${name} was already used`);
        }

        this._currentInstances = new DemoEntry(name, layoutComponent);
        this._componentsInstances.push(this._currentInstances);

        this._usedNames.push(name);

        componentsRegistrator(this);

        return this;
    }

    get names(): string[] {
        return this._usedNames;
    }

    description(markdown: string) {
        return this;
    }

    add(title: string, componentInstance: JSX.Element, description: string = '') {
        if (this._currentInstances) {
            this._currentInstances.add(title, description, componentInstance);
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