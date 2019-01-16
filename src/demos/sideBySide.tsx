import * as React from 'react';
import { Registry } from '../components';

const SideBySide = ({label}: {label: string}) => <div>Form {label}</div>;

export function sideBySideDemo(registry: Registry) {
    registry
        .add('state one', () => <SideBySide label="1"/>);
}