import * as React from 'react';

import { Registry } from '../components';
import { Button } from '../demo-components/Button';

function onClick() {
    return 0;
}

export function registerButtons(registry: Registry) {
    registry.registerAsTwoColumnTable('Buttons')
        .add('enabled', <Button label="click me" onClick={onClick}/>)
        .add('disabled', <Button label="click me" onClick={onClick}/>);
}