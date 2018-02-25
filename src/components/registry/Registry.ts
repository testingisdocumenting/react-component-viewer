import { DemoEntry } from './DemoEntry';
import { GridLayout, LayoutProps, TabsLayout } from '../';
import { LabelInstanceTableLayout } from '../layouts/LabelInstanceTableLayout';
import { SingleItemLayout } from '../layouts/SingleItemLayout';

class Registry {
    name: string;
    _usedNames: string[] = [];

    _demoEntries: DemoEntry[] = [];
    _currentDemo?: DemoEntry;

    constructor(name: string) {
        this.name = name;
    }

    registerAsGrid(name: string, minWidth: number, componentsRegistrator: (registry: Registry) => void) {
        return this.register(name, GridLayout, componentsRegistrator, '', {minWidth});
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

    registerAsMiniApp(name: string, urlPrefix: string, componentsRegistrator: (registry: Registry) => void) {
        this.register(name, SingleItemLayout, componentsRegistrator, urlPrefix);
    }

    register(name: string,
             layoutComponent: React.StatelessComponent<LayoutProps>,
             componentsRegistrator: (registry: Registry) => void,
             urlPrefix: string = '',
             layoutOpts: object = {}) {

        if (this._usedNames.indexOf(name) !== -1) {
            throw new Error(`name ${name} was already used`);
        }

        this._currentDemo = new DemoEntry(name, layoutComponent, urlPrefix, layoutOpts);
        this._demoEntries.push(this._currentDemo);

        this._usedNames.push(name);

        componentsRegistrator(this);

        return this;
    }

    get names(): string[] {
        return this._usedNames;
    }

    description(markdown: string) {
        if (this._currentDemo) {
            this._currentDemo.description(markdown);
        } else {
            throw new Error('call register method prior setting the description');
        }

        return this;
    }

    add(title: string, componentInstance: JSX.Element, description: string = '') {
        if (this._currentDemo) {
            this._currentDemo.add(title, description, componentInstance);
        } else {
            throw new Error('call register method prior adding elements');
        }

        return this;
    }

    firstMiniAppByUrl(url: string): DemoEntry | null {
        const byUrl = this._demoEntries
            .filter(entry => entry.isMiniApp() && url.startsWith(entry.urlPrefix));

        return byUrl.length > 0 ? byUrl[0] : null;
    }

    findByName(name: string): DemoEntry {
        const byName = this._demoEntries
            .filter(entry => entry.name === name);

        if (byName.length === 0) {
            throw new Error(`cannot find components by name: ${name}`);
        }

        return byName[0];
    }
}

export { Registry };