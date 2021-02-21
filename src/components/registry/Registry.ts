import * as React from 'react';

import { DemoEntry } from './DemoEntry';
import { GridLayout } from '../layouts/GridLayout';
import { TabsLayout } from '../layouts/TabsLayout';
import { LayoutProps } from '../layouts/LayoutProps';
import { LabelInstanceTableLayout } from '../layouts/LabelInstanceTableLayout';
import { SingleItemLayout } from '../layouts/SingleItemLayout';
import { wrapComponent, WrapperProps } from './componentWrapper';
import { findAndReturn } from './listUtils';
import { createRegistratorForMiniApp, createRegistratorForSingle } from '../registrators/registrators';

import '../layouts/DemoLayoutItemTitle.css';

export interface RegistryConfig {
    componentWrapper?: React.ComponentType<WrapperProps>;
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
        return this.register(name, GridLayout, componentRegistrator, undefined, {minWidth});
    }

    registerAsRows(name: string, componentRegistrator: (registry: Registry) => void) {
        return this.register(name, GridLayout, componentRegistrator, undefined, {minWidth: 0});
    }

    registerAsTabs(name: string, componentRegistrator: (registry: Registry) => void) {
        return this.register(name, TabsLayout, componentRegistrator);
    }

    registerAsTwoColumnTable(name: string, componentRegistrator: (registry: Registry) => void) {
        return this.register(name, LabelInstanceTableLayout, componentRegistrator);
    }

    registerSingle(name: string, singleComponent: React.ComponentType) {
        return this.register(name, SingleItemLayout, createRegistratorForSingle(name, singleComponent));
    }

    registerAsMiniApp(name: string,
                      urlRegexp: RegExp,
                      urlsByLabel: {[label: string]: string},
                      appComponent: React.ComponentType) {
        return this.register(name, SingleItemLayout,
                             createRegistratorForMiniApp(name, urlRegexp, urlsByLabel, appComponent), urlRegexp);
    }

    register(name: string,
             layoutComponent: React.ComponentType<LayoutProps>,
             componentRegistrator: (registry: Registry) => void,
             urlRegexp: RegExp | undefined = undefined,
             layoutOpts: object = {}) {

        if (this.usedNames.indexOf(name) !== -1) {
            throw new Error(`name ${name} was already used`);
        }

        this.currentDemo = new DemoEntry(name, layoutComponent, urlRegexp, layoutOpts);
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
            .filter(entry => entry.isMiniApp() && entry.urlRegexp!.test(url));

        return byUrl.length > 0 ? byUrl[0] : null;
    }

    findDemoByName(name: string): DemoEntry | null {
        const found = findDemoAndReturn(this.demoEntries, name, idx => this.demoEntries[idx]);
        return found ? found : null;
    }

    findNextDemoByCurrentName(name: string): DemoEntry {
        const found = findDemoAndReturn(this.demoEntries, name, idx => this.demoEntries[idx + 1]);
        return found ? found : this.demoEntries[this.demoEntries.length - 1];
    }

    findPrevDemoByCurrentName(name: string): DemoEntry {
        const found = findDemoAndReturn(this.demoEntries, name, idx => this.demoEntries[idx - 1]);
        return found ? found : this.demoEntries[0];
    }
}

function findDemoAndReturn(demos: DemoEntry[],
                           currentDemoName: string,
                           returnFunc: (idx: number) => DemoEntry | undefined) {
    return findAndReturn(demos, demo => demo.name === currentDemoName, returnFunc);
}

export { Registry };