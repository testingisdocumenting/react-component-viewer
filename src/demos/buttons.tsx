import * as React from 'react';

import { Registry } from '../components';
import { Button } from '../demo-components/Button';

function onClick() {
    return 0;
}

export function buttonsDemo(registry: Registry) {
    registry
        .add('enabled', <Button label="click me" onClick={onClick}/>)
        .add('disabled', <Button label="click me" onClick={onClick}/>);
}
