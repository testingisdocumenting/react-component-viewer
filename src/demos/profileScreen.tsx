import { Registry } from '../components';

import * as React from 'react';

export function DummyScreen() {
    return (
        <div>Dummy Screen</div>
    );
}

export function profileScreenDemo(registry: Registry) {
    registry.add('', <DummyScreen/>);
}