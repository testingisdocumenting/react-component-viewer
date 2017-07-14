import React, {Component} from 'react';

import './ComponentsViewer.css';

class ComponentsViewer extends Component {
    constructor(props) {
        super(props);
        const {registry} = this.props;

        this.state = {selectedName: registry.names[0]};
    }

    selectComponent = (name) => this.setState({selectedName: name});

    render() {
        const {registry} = this.props;
        const {selectedName} = this.state;

        const componentsDemo = registry.findComponentsDemoByName(selectedName);

        return (
            <div className="components-viewer">
                <div className="toc">
                    {registry.names.map(name => {
                        const isSelected = selectedName === name;
                        const className = "name" + (isSelected ? " selected" : "");

                        return (
                            <div key={name} className={className} onClick={() => this.selectComponent(name)}>
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

}

export default ComponentsViewer;
