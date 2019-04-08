import * as React from 'react';

import { Registries } from './components';
import { ComponentViewer } from './components';
import { buttonsDemo } from './demos/buttons';
import { linksDemo } from './demos/links';
import { ProfileApp } from './demos/ProfileApp';
import { sideBySideDemo } from './demos/sideBySide';
import { inputsDemo } from './demos/inputs';
import { WrapperProps } from './components/registry/componentWrapper';
import { ProfileScreenDemo } from './demos/ProfileScreenDemo';

const registries = new Registries({componentWrapper: DemoWrapper});
registries.add('components')
    .registerAsGrid('Links', 300, linksDemo)
    .registerAsTwoColumnTable('Buttons', buttonsDemo)
    .registerAsRows('Inputs', inputsDemo);

registries.add('layouts')
    .registerAsRows('Side by Side', sideBySideDemo);

registries.add('screens')
    .registerSingle('Single Screen', ProfileScreenDemo)
    .registerAsMiniApp('Single Screen mini app', '/app', /\/app/, ProfileApp);

export class App extends React.Component {
    render() {
        return (
            <ComponentViewer
                registries={registries}
                dropDowns={[this.createServiceDropDown(), this.createBrandDropDown()]}
            />
        );
    }

    private createBrandDropDown() {
        return {
            label: 'Brand',
            items: [
                {label: 'Brand-A', hotKey: 'Alt 1'},
                {label: 'B-Brand', hotKey: 'Alt 2'}
            ],
            onSelect: this.onBrandSelect
        };
    }

    private createServiceDropDown() {
        return {
            label: 'Services',
            items: [
                {label: 'Fake', hotKey: 'Alt 5'},
                {label: 'REST', hotKey: 'Alt 6'}
            ],
            onSelect: this.onServiceSelect
        };
    }

    private onBrandSelect = (brand: string) => {
        console.log('selected brand', brand);
    }

    private onServiceSelect = (service: string) => {
        console.log('selected service', service);
    }
}

function DemoWrapper({OriginalComponent}: WrapperProps) {
    return (
        <div className="component-demo-local-wrapper">
            <OriginalComponent/>
        </div>
    );
}