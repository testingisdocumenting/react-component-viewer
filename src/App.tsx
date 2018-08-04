import * as React from 'react';

import { Registry } from './components';
import { ComponentsViewer } from './components';
import { buttonsDemo } from './demos/buttons';
import { linksDemo } from './demos/links';
import { profileScreenDemo } from './demos/profileScreen';
import { formsDemo } from './demos/forms';
import { sideBySideDemo } from './demos/sideBySide';
import { longContentDemo } from './demos/longContent';

const widgets = new Registry('widgets');
widgets
    .registerAsGrid('Links', 300, linksDemo)
    .registerAsTwoColumnTable('Forms', formsDemo)
    .registerAsTwoColumnTable('Buttons', buttonsDemo)
    .registerAsTabs('Long Content', longContentDemo)
    .registerSingle('Single Screen', profileScreenDemo)
    .registerAsMiniApp('Single Screen mini app', '/app', profileScreenDemo);

const layouts = new Registry('layouts');
layouts
    .registerSingle('Side by Side', sideBySideDemo);

export function App() {
    return (
        <ComponentsViewer registries={[widgets, layouts]}/>
    );
}