import * as React from 'react';
import { Registry, simulateState } from '../components';

const [getValue, setValue] = simulateState('hello');

export function inputsDemo(registry: Registry) {
    registry
        .add('state one', () => (
                        <input
                            value={getValue()}
                            onChange={e => setValue(e.currentTarget.value)}
                        />
        ));
}