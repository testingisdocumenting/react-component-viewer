import * as React from 'react';
import { Component } from 'react';

import { Registry } from '../registry/Registry';
import { ComponentDemo } from './ComponentDemo';

import './ComponentsViewer.css';

const queryParamNames = {
    demoName: 'demo',
    demoDescription: 'description',
};

export interface Props {
    registry: Registry;
}

export interface State {
    selectedDemoName: string;
    selectedDemoDescription: string;
}

class ComponentsViewer extends Component<Props, State> {
    private static pushWindowHistory(demoName: string, description: string) {
        const url = `?${queryParamNames.demoName}=${demoName}&${queryParamNames.demoDescription}=${description}`;
        window.history.pushState({}, '', url);
    }

    constructor(props: Props) {
        super(props);

        const name = this.firstName();
        this.state = {
            selectedDemoName: name,
            selectedDemoDescription: this.firstDescriptionByName(name)
        };
    }

    selectDemo = (demoName: string) => {
        this.setState({
            selectedDemoName: demoName,
            selectedDemoDescription: this.firstDescriptionByName(demoName)
        });

        ComponentsViewer.pushWindowHistory(demoName, this.firstDescriptionByName(demoName));
    }

    selectInstanceByDescription = (description: string) => {
        const {selectedDemoName} = this.state;

        this.setState({selectedDemoDescription: description});
        ComponentsViewer.pushWindowHistory(selectedDemoName, description);
    }

    firstName() {
        const {registry} = this.props;
        return registry.names[0];
    }

    firstDescriptionByName(name: string) {
        const {registry} = this.props;
        return registry.findByName(name).instancesWithDescription.data[0].description;
    }

    render() {
        const {registry} = this.props;
        const {selectedDemoName, selectedDemoDescription} = this.state;

        const componentsInstances = registry.findByName(selectedDemoName);

        return (
            <div className="components-viewer">
                <div className="toc">
                    {registry.names.map(name => {
                        const isSelected = selectedDemoName === name;
                        const className = 'name' + (isSelected ? ' selected' : '');

                        return (
                            <div key={name} className={className} onClick={() => this.selectDemo(name)}>
                                {name}
                            </div>
                        );
                    })}

                </div>
                <div className="preview">
                    <ComponentDemo
                        componentInstances={componentsInstances}
                        selectedDescription={selectedDemoDescription}
                        onInstanceSelect={this.selectInstanceByDescription}
                    />
                </div>
            </div>
        );
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(document.location.search);
        const selectedDemoName = searchParams.get(queryParamNames.demoName) ||
            this.firstName();
        const selectedDemoDescription = searchParams.get(queryParamNames.demoDescription) ||
            this.firstDescriptionByName(selectedDemoName);

        if (selectedDemoName) {
            this.setState({selectedDemoName, selectedDemoDescription});
        }
    }
}

export { ComponentsViewer };
