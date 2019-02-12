import * as React from 'react';

import { Registry } from '../components';
import { Button } from '../demo-components/Button';

function onClick() {
    return 0;
}

export function buttonsDemo(registry: Registry) {
    registry
        .add('primary', () => <Button primary label="click me" onClick={onClick}/>,
             `long description
             multiline markdown`)
        .add('secondary', () => <Button label="click me" onClick={onClick}/>);
}
