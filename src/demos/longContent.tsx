import * as React from 'react';

import { Registry } from '../components';
import { LongContent } from '../demo-components/LongContent';

export function longContentDemo(registry: Registry) {
    registry
        .description(`primary buttons are used to define the main action`)
        .add('case one', () => <LongContent numberOfLines={10}/>)
        .add('case two', () => <LongContent numberOfLines={15}/>);
}
