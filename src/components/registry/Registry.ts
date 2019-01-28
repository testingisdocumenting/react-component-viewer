import * as React from 'react';

import { DemoEntry } from './DemoEntry';
import { GridLayout } from '../layouts/GridLayout';
import { TabsLayout } from '../layouts/TabsLayout';
import { LayoutProps } from '../layouts/LayoutProps';
import { LabelInstanceTableLayout } from '../layouts/LabelInstanceTableLayout';
import { SingleItemLayout } from '../layouts/SingleItemLayout';
import { wrapComponent } from './componentWrapper';

export interface RegistryConfig {
    componentWrapper?: React.ComponentType;
}

class Registry {
    private readonly config?: RegistryConfig;
    private readonly usedNames: string[] = [];
    private readonly demoEntries: DemoEntry[] = [];

    private currentDemo?: DemoEntry;

    readonly name: string;

    constructor(name: string, config?: RegistryConfig) {
        this.name = name;
        this.config = config;
    }

    registerAsGrid(name: string, minWidth: number, componentRegistrator: (registry: Registry) => void) {
        return this.register(name, GridLayout, componentRegistrator, '', {minWidth});
    }

    registerAsRows(name: string, componentRegistrator: (registry: Registry) => void) {
        return this.register(name, GridLayout, componentRegistrator, '', {minWidth: 0});
    }

    registerAsTabs(name: string, componentRegistrator: (registry: Registry) => void) {
        return this.register(name, TabsLayout, componentRegistrator);
    }

    registerAsTwoColumnTable(name: string, componentRegistrator: (registry: Registry) => void) {
        return this.register(name, LabelInstanceTableLayout, componentRegistrator);
    }

    registerSingle(name: string, componentRegistrator: (registry: Registry) => void) {
        this.register(name, SingleItemLayout, componentRegistrator);
        return this;
    }

    registerAsMiniApp(name: string, urlPrefix: string, componentRegistrator: (registry: Registry) => void) {
        this.register(name, SingleItemLayout, componentRegistrator, urlPrefix);
    }

    register(name: string,
             layoutComponent: React.ComponentType<LayoutProps>,
             componentRegistrator: (registry: Registry) => void,
             urlPrefix: string = '',
             layoutOpts: object = {}) {

        if (this.usedNames.indexOf(name) !== -1) {
            throw new Error(`name ${name} was already used`);
        }

        this.currentDemo = new DemoEntry(name, layoutComponent, urlPrefix, layoutOpts);
        this.demoEntries.push(this.currentDemo);

        this.usedNames.push(name);

        componentRegistrator(this);

        return this;
    }

    get names(): string[] {
        return this.usedNames;
    }

    description(markdown: string) {
        if (this.currentDemo) {
            this.currentDemo.description(markdown);
        } else {
            throw new Error('call register method prior setting the description');
        }

        return this;
    }

    add(title: string, component: React.ComponentType, description: string = '') {
        const componentToRegister = this.config && this.config.componentWrapper ?
            wrapComponent(this.config.componentWrapper, component) :
            component;

        if (this.currentDemo) {
            this.currentDemo.add(title, description, componentToRegister);
        } else {
            throw new Error('call register method prior adding elements');
        }

        return this;
    }

    firstMiniAppByUrl(url: string): DemoEntry | null {
        const byUrl = this.demoEntries
            .filter(entry => entry.isMiniApp() && url.startsWith(entry.urlPrefix));

        return byUrl.length > 0 ? byUrl[0] : null;
    }

    findByName(name: string): DemoEntry | null {
        const byName = this.demoEntries
            .filter(entry => entry.name === name);

        if (byName.length === 0) {
            return null;
        }

        return byName[0];
    }
}

export { Registry };