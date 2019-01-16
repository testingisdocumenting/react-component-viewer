import * as React from 'react';
import { Registry } from '../components';

const TestComponent = ({label}: {label: string}) => <div>TC: {label}</div>;
const AnotherTestComponent = ({label}: {label: string}) => <div>Another TC: {label}</div>;

export function linksDemo(registry: Registry) {
    registry
        .add('state one', () => <TestComponent label="1"/>)
        .add('state two', () => <TestComponent label="2"/>)
        .add('state three', () => <AnotherTestComponent label="3"/>)
        .add('state four', () => <AnotherTestComponent label="4"/>);
}