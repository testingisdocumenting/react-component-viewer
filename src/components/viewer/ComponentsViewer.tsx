import * as React from 'react';
import { Component } from 'react';

import './ComponentsViewer.css';
import Registry from '../registry/Registry';

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

        this.state = {selectedDemoName: registry.demoNames[0]};
    }

    selectDemo = (demoName: string) => {
        this.setState({selectedDemoName: demoName});
        window.history.pushState({}, '', `?${queryParamNames.demoName}=` + demoName);
    }

    render() {
        const {registry} = this.props;
        const {selectedDemoName} = this.state;

        const componentsDemo = registry.findComponentsDemoByName(selectedDemoName);

        return (
            <div className="components-viewer">
                <div className="toc">
                    {registry.demoNames.map(name => {
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
                    {componentsDemo}
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
