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

# React Component Viewer

```typescript 
import * as React from 'react';

import { Registry, ComponentViewer } from 'react-component-viewer';

import { buttonsDemo } from './demos/buttons';
import { linksDemo } from './demos/links';
import { profileScreenDemo } from './demos/profileScreen';
import { formsDemo } from './demos/forms';
import { sideBySideDemo } from './demos/sideBySide';

const widgets = new Registry('widgets');
widgets
    .registerAsGrid('Links', 300, linksDemo)
    .registerAsTwoColumnTable('Forms', formsDemo)
    .registerAsTwoColumnTable('Buttons', buttonsDemo)
    .registerAsRows('Inputs', inputsDemo);

const layouts = new Registry('layouts');
const endToEnd = new Registry('end to end');

export class App extends React.Component {
    render() {
        return (
            <ComponentViewer
                registries={[widgets, layouts, endToEnd]}
                dropDown={{
                    label: 'Brand',
                    items: [
                        {label: 'Brand-A', hotKey: 'Alt 1'},
                        {label: 'B-Brand', hotKey: 'Alt 2'}
                    ],
                    onSelect: this.onBrandSelect
                }}
            />
        );
    }

    private onBrandSelect(brand: string) {
        // ...
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

