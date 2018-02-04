import * as React from 'react';

import { Registry } from '../components';
import { Button } from '../demo-components/Button';

function onClick() {
    return 0;
}

export function buttonsDemo(registry: Registry) {
    registry
        .description(`in between layouts description`)
        .add('enabled', <Button label="click me" onClick={onClick}/>,
             `long description
             multiline markdown`)
        .add('disabled', <Button label="click me" onClick={onClick}/>);
}
