import React, {Component} from 'react';

import Registry from './registry/Registry';
import Header from './registry/Header';
import ComponentsViewer from './viewer/ComponentsViewer';

const TestComponent = ({label}) => <div>TC: {label}</div>;
const AnotherTestComponent = ({label}) => <div>Another TC: {label}</div>;

const delimiter = "1";

const registry = new Registry();

registry.registerAsGrid("Links", {
    "simple states": <Header/>,
    "state-one": <AnotherTestComponent label="1"/>,
    "state-two": <AnotherTestComponent label="2"/>,
    "complex states": <Header/>,
    "state-three": <AnotherTestComponent label="3"/>
});

registry.registerAsGrid("Buttons", {
    "disabled": <TestComponent label="1"/>,
    "enabled": <TestComponent label="2"/>
});

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
