import * as React from 'react';

import { Registry } from '../components';
import { Button } from '../demo-components/Button';

function onClick() {
    return 0;
}

export function buttonsDemo(registry: Registry) {
    registry
        .description(`primary buttons are used to define the main action`)
        .add('enabled', <Button label="click me" onClick={onClick}/>,
             `long description
             multiline markdown`)
        .add('disabled', <Button label="click me" onClick={onClick}/>)
        .description(`
        secondary buttons are for extra information and miscellaneous actions
        `)
        .add('enabled 2', <Button label="click me" onClick={onClick}/>,
             `long description
             multiline markdown`)
        .add('disabled 2', <Button label="click me" onClick={onClick}/>);
}
