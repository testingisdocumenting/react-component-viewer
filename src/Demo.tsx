import * as React from 'react';
import { Component } from 'react';

import Registry from './components/registry/Registry';
import { Header } from './components/registry/Header';
import { ComponentsViewer } from './components/viewer/ComponentsViewer';

const TestComponent = ({label}: {label: string}) => <div>TC: {label}</div>;
const AnotherTestComponent = ({label}: {label: string}) => <div>Another TC: {label}</div>;

const registry = new Registry();

registry.registerAsGrid('Links', {
    'simple states': <Header label="header one"/>,
    'state-one': <AnotherTestComponent label="1"/>,
    'state-two': <AnotherTestComponent label="2"/>,
    'complex states': <Header label="header two"/>,
    'state-three': <AnotherTestComponent label="3"/>
});

registry.registerAsGrid('Buttons', {
    'disabled': <TestComponent label="1"/>,
    'enabled': <TestComponent label="2"/>
});

class Demo extends Component {
    render() {
        return (
            <ComponentsViewer registry={registry}/>
        );
    }
}

export default Demo;
