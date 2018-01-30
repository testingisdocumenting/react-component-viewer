import * as React from 'react';
import { Component } from 'react';

import './ComponentsViewer.css';
import { Registry } from '../registry/Registry';
import { ComponentDemo } from './ComponentDemo';

const queryParamNames = {
    demoName: 'demo'
};

export interface Props {
    registry: Registry;
}

export interface State {
    selectedDemoName: string;
}

class ComponentsViewer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const {registry} = this.props;

        this.state = {selectedDemoName: registry.names[0]};
    }

    selectDemo = (demoName: string) => {
        this.setState({selectedDemoName: demoName});
        window.history.pushState({}, '', `?${queryParamNames.demoName}=` + demoName);
    }

    render() {
        const {registry} = this.props;
        const {selectedDemoName} = this.state;

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
                    <ComponentDemo componentInstances={componentsInstances}/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(document.location.search);
        const selected = searchParams.get(queryParamNames.demoName);
        if (selected) {
            this.setState({selectedDemoName: selected});
        }
    }
}

export {ComponentsViewer};
