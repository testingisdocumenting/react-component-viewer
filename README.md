# Intro

![screen example](documentation/rcv/static/screen-example.png)

React Component to help with development of other react components.
* Just a component, no build system: works with your setup seamlessly.
* See your components at once in the different states.
* Zoom-in into a single component for debug.
* User defined theme switching for multi brand/theme development. 

# Installation

```
npm install react-component-viewer --save-dev 
```

# CRA Example

``` typescript
import * as React from 'react';

import { Registries, ComponentViewer } from 'react-component-viewer';

import { buttonsDemo } from './demos/buttons';
import { linksDemo } from './demos/links';
import { profileScreenDemo } from './demos/profileScreen';
import { formsDemo } from './demos/forms';
import { sideBySideDemo } from './demos/sideBySide';

const registries = new Registries();
registries.add('widgets')
    .registerAsGrid('Links', 300, linksDemo)
    .registerAsTwoColumnTable('Forms', formsDemo)
    .registerAsTwoColumnTable('Buttons', buttonsDemo)
    .registerAsRows('Inputs', inputsDemo);

registries.add('layouts')
    .registerSingle('Side by Side', sideBySideDemo);

registries.add('end to end')
    .registerSingle('Single Screen', profileScreenDemo)
    .registerAsMiniApp('Single Screen mini app', '/app', profileScreenDemo);

export class App extends React.Component {
    render() {
        return (
            <ComponentViewer registries={registries}/>
        );
    }
}
```

# Demo functions

Demo must be defined in a function that accepts `Registry`. Function should register components to display.

```typescript
export function buttonsDemo(registry: Registry) {
    registry
        .add('primary', () => <Button primary label="click me" onClick={onClick}/>,
             `long description
             multiline markdown`)
        .add('secondary', () => <Button label="click me" onClick={onClick}/>);
}
``` 

# Registration methods

`registerAsGrid` name, minWidth, demoFunction

`registerAsRows` name, demoFunction

`registerAsTwoColumnTable` name, demoFunction

`registerAsTabs` name, demoFunction

`registerAsSingle` name, demoFunction

