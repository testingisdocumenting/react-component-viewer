import * as React from 'react';

import { Registry } from '../components';
import { Button } from '../demo-components/Button';
import { simpleAction } from '../components/actions/actions';

const onPrimaryClick = simpleAction('primary clicked');
const onSecondaryClick = simpleAction('secondary clicked');

export function buttonsDemo(registry: Registry) {
    registry
        .add('primary',
             () => <Button primary label="click me" onClick={onPrimaryClick}/>)
        .add('secondary',
             () => <Button label="click me" onClick={onSecondaryClick}/>);
}
