import * as React from 'react';

import { ComponentInstances } from './ComponentInstances';
import { GridLayout } from '../';

class Registry {
    _usedNames: string[] = [];

    _componentsInstances: ComponentInstances[] = [];
    _currentInstances?: ComponentInstances;

    registerAsGrid(name: string) {
        return this.register(name, <GridLayout/>);
    }

    register(name: string, layoutInstance: JSX.Element) {
        if (this._usedNames.indexOf(name) !== -1) {
            throw new Error(`name ${name} was already used`);
        }

        this._currentInstances = new ComponentInstances(name, layoutInstance);
        this._componentsInstances.push(this._currentInstances);

        this._usedNames.push(name);

        return this;
    }

    get names(): string[] {
        return this._usedNames;
    }

    add(name: string, componentInstance: JSX.Element) {
        if (this._currentInstances) {
            this._currentInstances.add(name, componentInstance);
        } else {
            throw new Error('call register method prior adding elements');
        }

        return this;
    }

    findByName(name: string): ComponentInstances {
        const byName = this._componentsInstances
            .filter(instances => instances.name === name);

        if (byName.length === 0) {
            throw new Error(`cannot find components by name: ${name}`);
        }

        return byName[0];
    }
}

export { Registry };