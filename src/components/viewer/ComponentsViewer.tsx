import * as React from 'react';
import { Component } from 'react';

import { Registry } from '../registry/Registry';
import { ComponentDemo } from './ComponentDemo';

import './ComponentsViewer.css';

const queryParamNames = {
    demoName: 'demo',
    demoTitle: 'title',
};

export interface Props {
    registry: Registry;
}

export interface State {
    selectedDemoName: string;
    selectedDemoTitle: string;
    filterText: string;
}

class ComponentsViewer extends Component<Props, State> {
    private static pushWindowHistory(demoName: string, description: string) {
        const url = `?${queryParamNames.demoName}=${demoName}&${queryParamNames.demoTitle}=${description}`;
        window.history.pushState({}, '', url);
    }

    constructor(props: Props) {
        super(props);

        const name = this.firstName();
        this.state = {
            selectedDemoName: name,
            selectedDemoTitle: this.firstTitleByName(name),
            filterText: ''
        };
    }

    render() {
        const {registry} = this.props;
        const {
            selectedDemoName,
            selectedDemoTitle,
            filterText
        } = this.state;

        const componentsInstances = registry.findByName(selectedDemoName);

        return (
            <div className="components-viewer">
                <div className="toc-panel">
                    <div className="search-box">
                        <input
                            value={filterText}
                            placeholder="filter by demo name..."
                            onChange={this.onFilterTextChange}
                        />
                    </div>

                    <div className="toc">
                        {this.demoNames.map(name => {
                            const isSelected = selectedDemoName === name;
                            const className = 'name' + (isSelected ? ' selected' : '');

                            return (
                                <div key={name} className={className} onClick={() => this.selectDemo(name)}>
                                    {name}
                                </div>
                            );
                        })}

                    </div>
                </div>
                <div className="preview">
                    <ComponentDemo
                        componentInstances={componentsInstances}
                        selectedTitle={selectedDemoTitle}
                        onInstanceSelect={this.selectInstanceByTitle}
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(document.location.search);
        const selectedDemoName = searchParams.get(queryParamNames.demoName) ||
            this.firstName();
        const selectedDemoTitle = searchParams.get(queryParamNames.demoTitle) ||
            this.firstTitleByName(selectedDemoName);

        if (selectedDemoName) {
            this.setState({selectedDemoName, selectedDemoTitle});
        }
    }

    private selectDemo = (demoName: string) => {
        this.setState({
            selectedDemoName: demoName,
            selectedDemoTitle: this.firstTitleByName(demoName)
        });

        ComponentsViewer.pushWindowHistory(demoName, this.firstTitleByName(demoName));
    }

    private selectInstanceByTitle = (title: string) => {
        const {selectedDemoName} = this.state;

        this.setState({selectedDemoTitle: title});
        ComponentsViewer.pushWindowHistory(selectedDemoName, title);
    }

    private get demoNames() {
        const {registry} = this.props;
        const {filterText} = this.state;

        return registry.names.filter(name =>
            name.toLocaleLowerCase().indexOf(filterText.toLowerCase()) >= 0);
    }

    private firstName() {
        const {registry} = this.props;
        return registry.names[0];
    }

    private firstTitleByName(name: string) {
        const {registry} = this.props;
        return registry.findByName(name).instancesWithDescription.data[0].title;
    }

    private onFilterTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({filterText: e.currentTarget.value});
    }
}

export { ComponentsViewer };
