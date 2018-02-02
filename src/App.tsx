import * as React from 'react';
import { Component } from 'react';

import { Registry } from './components';
import { ComponentsViewer } from './components';
import { buttonsDemo } from './demos/buttons';
import { linksDemo } from './demos/links';
import { profileScreenDemo } from './demos/profileScreen';

const registry = new Registry();

registry
    .registerAsTabs('Links', linksDemo)
    .registerAsTwoColumnTable('Buttons', buttonsDemo)
    .registerSingle('Single Screen', profileScreenDemo);

class Demo extends Component {
    render() {
        return (
            <ComponentsViewer registry={registry}/>
        );
    }
}

export default Demo;
