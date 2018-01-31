import * as React from 'react';
import { Component } from 'react';

import { Registry } from './components';
import { ComponentsViewer } from './components';
import { registerButtons } from './demos/buttons';

const TestComponent = ({label}: {label: string}) => <div>TC: {label}</div>;
const AnotherTestComponent = ({label}: {label: string}) => <div>Another TC: {label}</div>;

const registry = new Registry();

registry
    .registerAsGrid('Links')
    .add('state one', <TestComponent label="1"/>)
    .add('state two', <TestComponent label="2"/>)
    .add('state three', <AnotherTestComponent label="3"/>)
    .add('state four', <AnotherTestComponent label="4"/>);

registerButtons(registry);

class Demo extends Component {
    render() {
        return (
            <ComponentsViewer registry={registry}/>
        );
    }
}

export default Demo;
