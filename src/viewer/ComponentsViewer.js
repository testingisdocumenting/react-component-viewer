import React, {Component} from 'react';

import './ComponentsViewer.css';

class ComponentsViewer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {registry} = this.props;
        const componentsDemo = registry.findComponentsDemoByName("Buttons");

        return (
            <div className="components-viewer">
                <div className="toc">
                    {registry.names.map(name => <div key={name} className="name">{name}</div>)}
                </div>
                <div className="preview">
                    {componentsDemo}
                </div>
            </div>
        )
    }

}

export default ComponentsViewer;
