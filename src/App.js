import React, {Component} from 'react';

import Registry from './registry/Registry';
import ComponentsViewer from './viewer/ComponentsViewer';
import RaisedButton from 'material-ui/RaisedButton';

const TestComponent = ({label}) => <div>TC: {label}</div>;

const registry = new Registry();
registry.registerAsGrid("Buttons", {
    "disabled": <TestComponent label="1"/>,
    "enabled": <TestComponent label="2"/>});

class App extends Component {
    render() {
        return (
            <ComponentsViewer registry={registry}/>
        );
    }
}

function withDescription() {

}

export default App;
