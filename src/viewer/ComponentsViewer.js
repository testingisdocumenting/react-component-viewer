import React, {Component} from 'react';

import './ComponentsViewer.css';

const queryParamNames = {
    demoName: "demo"
};

class ComponentsViewer extends Component {
    constructor(props) {
        super(props);
        const {registry} = this.props;

        this.state = {selectedDemoName: registry.demoNames[0]};
    }

    selectDemo = (demoName) => {
        this.setState({selectedDemoName: demoName});
        window.history.pushState({}, null, `?${queryParamNames.demoName}=` + demoName);
    };

    render() {
        const {registry} = this.props;
        const {selectedDemoName} = this.state;

        const componentsDemo = registry.findComponentsDemoByName(selectedDemoName);

        return (
            <div className="components-viewer">
                <div className="toc">
                    {registry.demoNames.map(name => {
                        const isSelected = selectedDemoName === name;
                        const className = "name" + (isSelected ? " selected" : "");

                        return (
                            <div key={name} className={className} onClick={() => this.selectDemo(name)}>
                                {name}
                            </div>
                        )
                    })}

                </div>
                <div className="preview">
                    {componentsDemo}
                </div>
            </div>
        )
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(document.location.search);
        const selected = searchParams.get(queryParamNames.demoName);
        if (selected) {
            this.setState({selectedDemoName: selected});
        }
    }
}

export default ComponentsViewer;
