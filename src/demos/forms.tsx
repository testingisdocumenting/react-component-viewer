import * as React from 'react';
import { Registry } from '../components';

const Form = ({label}: {label: string}) => <div>Form {label}</div>;

export function formsDemo(registry: Registry) {
    registry
        .add('state one', <Form label="1"/>)
        .add('state two', <Form label="2"/>)
        .add('state three', <Form label="3"/>)
        .add('state four', <Form label="4"/>);
}