import * as React from 'react';
import { Component } from 'react';

import { Registry } from '../registry/Registry';
import { ComponentDemo } from './ComponentDemo';

import './ComponentsViewer.css';
import { RegistrySelection } from './RegistrySelection';
import { TableOfContents } from './toc/TableOfContents';

const queryParamNames = {
    registryName: 'registry',
    demoName: 'demo',
    demoTitle: 'title',
};

export interface Props {
    registries: Registry[];
}

export interface State {
    selectedRegistryName: string;
    selectedDemoName: string;
    selectedDemoTitle: string;
    filterText: string;
}

class ComponentsViewer extends Component<Props, State> {
    private _registryNames: string[];

    private static pushWindowHistory(registryName: string, demoName: string, description: string) {
        const url = '?' +
            queryParamNames.registryName + '=' + registryName + '&' +
            queryParamNames.demoName + '=' + demoName + '&' +
            queryParamNames.demoTitle + '=' + description;

        window.history.pushState({}, '', url);
    }

    private static firstDemoName(registry: Registry) {
        return registry.names[0];
    }

    private static firstTitleByDemoName(registry: Registry, name: string) {
        return registry.findByName(name).demoInstances.all[0].title;
    }

    constructor(props: Props) {
        super(props);

        const {registries} = this.props;

        const registry = this.firstRegistry;
        const demoName = ComponentsViewer.firstDemoName(registry);

        this.state = {
            selectedRegistryName: registry.name,
            selectedDemoName: demoName,
            selectedDemoTitle: ComponentsViewer.firstTitleByDemoName(registry, demoName),
            filterText: ''
        };

        this._registryNames = registries.map(r => r.name);
    }

    render() {
        const {
            selectedRegistryName,
            selectedDemoName,
            selectedDemoTitle,
            filterText
        } = this.state;

        const componentsInstances = this.selectedRegistry.findByName(selectedDemoName);

        return (
            <div className="rcw-components-viewer">
                <RegistrySelection
                    names={this._registryNames}
                    selectedName={selectedRegistryName}
                    onSelect={this.selectRegistry}
                />

                <div className="toc-panel-and-preview">
                    <div className="toc-panel">
                        <div className="search-box">
                            <input
                                value={filterText}
                                placeholder="filter by demo name..."
                                onChange={this.onFilterTextChange}
                            />
                        </div>

                        <TableOfContents
                            names={this.demoNames}
                            selectedName={selectedDemoName}
                            onSelect={this.selectDemo}
                        />
                    </div>

                    <div className="preview">
                        <ComponentDemo
                            demoEntry={componentsInstances}
                            selectedTitle={selectedDemoTitle}
                            onInstanceSelect={this.selectInstanceByTitle}
                        />
                    </div>
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
        const selectedDemoTitle = searchParams.get(queryParamNames.demoTitle) ||
            ComponentsViewer.firstTitleByDemoName(this.firstRegistry, selectedDemoName);

        if (selectedDemoName) {
            this.setState({selectedRegistryName, selectedDemoName, selectedDemoTitle});
        }
    }

    private selectRegistry = (registryName: string) => {
        const registry = this.registryByName(registryName);
        const demoName = ComponentsViewer.firstDemoName(registry);
        const demoTitle = ComponentsViewer.firstTitleByDemoName(registry, demoName);

        this.setState({
            selectedRegistryName: registryName,
            selectedDemoName: demoName,
            selectedDemoTitle: demoTitle
        });

        ComponentsViewer.pushWindowHistory(registryName, demoName, demoTitle);
    }

    private selectDemo = (demoName: string) => {
        const demoTitle = ComponentsViewer.firstTitleByDemoName(this.selectedRegistry, demoName);
        this.setState({
            selectedDemoName: demoName,
            selectedDemoTitle: demoTitle
        });

        ComponentsViewer.pushWindowHistory(this.selectedRegistry.name, demoName, demoTitle);
    }

    private selectInstanceByTitle = (title: string) => {
        const {selectedDemoName} = this.state;

        this.setState({selectedDemoTitle: title});
        ComponentsViewer.pushWindowHistory(this.selectedRegistry.name, selectedDemoName, title);
    }

    private get selectedRegistry(): Registry {
        const {registries} = this.props;

        if (! this.state) {
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
