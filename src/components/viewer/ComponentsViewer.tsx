import * as React from 'react';
import { Component } from 'react';

import { Registry } from '../registry/Registry';
import { ComponentDemo } from './ComponentDemo';

import { RegistrySelection } from './RegistrySelection';
import { TableOfContents } from './toc/TableOfContents';

import { DemoEntryAndRegistry } from '../registry/DemoEntryAndRegistry';

import './ComponentsViewer.css';

const queryParamNames = {
    registryName: 'registry',
    demoName: 'demo',
    demoEntryTitle: 'title',
};

export interface Props {
    registries: Registry[];
}

export interface State {
    selectedRegistryName: string;
    selectedDemoName: string;
    selectedEntryTitle: string;
    filterText: string;
}

class ComponentsViewer extends Component<Props, State> {
    private _registryNames: string[];

    private static pushWindowHistory(registryName: string, demoName: string, description: string) {
        const url = '?' +
            queryParamNames.registryName + '=' + registryName + '&' +
            queryParamNames.demoName + '=' + demoName + '&' +
            queryParamNames.demoEntryTitle + '=' + description;

        window.history.pushState({}, '', url);
    }

    private static firstDemoName(registry: Registry) {
        return registry.names[0];
    }

    private static firstTitleByDemoName(registry: Registry, name: string) {
        return registry.findByName(name).firstEntryTitle;
    }

    constructor(props: Props) {
        super(props);

        const {registries} = this.props;

        const registry = this.firstRegistry;
        const demoName = ComponentsViewer.firstDemoName(registry);

        this.state = {
            selectedRegistryName: registry.name,
            selectedDemoName: demoName,
            selectedEntryTitle: ComponentsViewer.firstTitleByDemoName(registry, demoName),
            filterText: ''
        };

        this._registryNames = registries.map(r => r.name);
    }

    render() {
        const {
            selectedRegistryName,
            selectedDemoName,
            selectedEntryTitle,
            filterText
        } = this.state;

        const demoEntry = this.selectedRegistry.findByName(selectedDemoName);

        if (demoEntry.isMiniApp()) {
            return (
                <ComponentDemo
                    demoEntry={demoEntry}
                    selectedTitle={selectedEntryTitle}
                    onInstanceSelect={this.selectInstanceByTitle}
                />
            );
        }

        return (
            <div className="rcw-components-viewer">
                <div className="registry-selection-panel">
                    <RegistrySelection
                        names={this._registryNames}
                        selectedName={selectedRegistryName}
                        onSelect={this.selectRegistry}
                    />
                </div>

                <div className="search-box">
                    <input
                        value={filterText}
                        placeholder="filter by demo name..."
                        onChange={this.onFilterTextChange}
                    />
                </div>

                <div className="toc-panel">
                    <TableOfContents
                        names={this.demoNames}
                        selectedName={selectedDemoName}
                        onSelect={this.selectDemo}
                    />
                </div>

                <div className="preview">
                    <ComponentDemo
                        demoEntry={demoEntry}
                        selectedTitle={selectedEntryTitle}
                        onInstanceSelect={this.selectInstanceByTitle}
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(document.location.search);

        const selectedRegistryName = searchParams.get(queryParamNames.registryName) ||
            this.firstRegistry.name;
        const selectedDemoName = searchParams.get(queryParamNames.demoName) ||
            ComponentsViewer.firstDemoName(this.firstRegistry);
        const selectedEntryTitle = searchParams.get(queryParamNames.demoEntryTitle) ||
            ComponentsViewer.firstTitleByDemoName(this.firstRegistry, selectedDemoName);

        const miniAppByUrl = this.miniAppByUrl(document.location.pathname);
        if (miniAppByUrl) {
            this.setState({
                selectedRegistryName: miniAppByUrl.registry.name,
                selectedDemoName: miniAppByUrl.demoEntry.name,
                selectedEntryTitle: miniAppByUrl.demoEntry.firstEntryTitle
            });
        } else if (selectedDemoName) {
            this.setState({selectedRegistryName, selectedDemoName, selectedEntryTitle});
        }
    }

    private miniAppByUrl(url: string): DemoEntryAndRegistry | null {
        const foundDemos = this.props.registries.map(r => ({miniApp: r.firstMiniAppByUrl(url), registry: r}))
            .filter(found => found.miniApp !== null);

        return foundDemos.length > 0 ?
            {demoEntry: foundDemos[0].miniApp, registry: foundDemos[0].registry} as DemoEntryAndRegistry :
            null;
    }

    private selectRegistry = (registryName: string) => {
        const registry = this.registryByName(registryName);
        const demoName = ComponentsViewer.firstDemoName(registry);
        const demoEntryTitle = ComponentsViewer.firstTitleByDemoName(registry, demoName);

        this.setState({
            selectedRegistryName: registryName,
            selectedDemoName: demoName,
            selectedEntryTitle: demoEntryTitle
        });

        ComponentsViewer.pushWindowHistory(registryName, demoName, demoEntryTitle);
    }

    private selectDemo = (demoName: string) => {
        const demoEntryTitle = ComponentsViewer.firstTitleByDemoName(this.selectedRegistry, demoName);
        this.setState({
            selectedDemoName: demoName,
            selectedEntryTitle: demoEntryTitle
        });

        ComponentsViewer.pushWindowHistory(this.selectedRegistry.name, demoName, demoEntryTitle);
    }

    private selectInstanceByTitle = (title: string) => {
        const {selectedDemoName} = this.state;

        this.setState({selectedEntryTitle: title});
        ComponentsViewer.pushWindowHistory(this.selectedRegistry.name, selectedDemoName, title);
    }

    private get selectedRegistry(): Registry {
        const {registries} = this.props;

        if (!this.state) {
            return registries[0];
        }

        const {selectedRegistryName} = this.state;
        return this.registryByName(selectedRegistryName);
    }

    private registryByName(name: string) {
        const {registries} = this.props;

        const found = registries.filter(r => r.name === name);

        if (found.length === 0) {
            throw new Error(`cannot find registry with ${name} name`);
        }

        return found.length ? found[0] : registries[0];
    }

    private get demoNames() {
        const {filterText} = this.state;

        return this.selectedRegistry.names.filter(name =>
            name.toLocaleLowerCase().indexOf(filterText.toLowerCase()) >= 0);
    }

    private get firstRegistry() {
        const {registries} = this.props;
        return registries[0];
    }

    private onFilterTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({filterText: e.currentTarget.value});
    }
}

export { ComponentsViewer };
