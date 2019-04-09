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
import { DropDowns } from './components/viewer/dropdown/DropDowns';

const registries = new Registries({componentWrapper: DemoWrapper});
registries.add('components')
    .registerAsGrid('Links', 300, linksDemo)
    .registerAsTwoColumnTable('Buttons', buttonsDemo)
    .registerAsRows('Inputs', inputsDemo);

registries.add('layouts')
    .registerAsRows('Side by Side', sideBySideDemo);

registries.add('screens')
    .registerSingle('Single Screen', ProfileScreenDemo)
    .registerAsMiniApp('Single Screen mini app', /\/app/,
                       {'welcome part': '/app/welcome'},
                       ProfileApp);

const dropDowns = new DropDowns();
dropDowns.add('Brand')
    .addItem('Brand-A', 'Alt 1')
    .addItem('B-Brand', 'Alt 2')
    .onSelect(onBrandSelect);

dropDowns.add('Services')
    .addItem('Fake', 'Alt 5')
    .addItem('REST', 'Alt 6')
    .onSelect(onServiceSelect);

export class App extends React.Component {
    render() {
        return (
            <ComponentViewer registries={registries} dropDowns={dropDowns}/>
        );
    }
}

function onBrandSelect(brand: string) {
    console.log('selected brand', brand);
}

function onServiceSelect(service: string) {
    console.log('selected service', service);
}

function DemoWrapper({OriginalComponent}: WrapperProps) {
    return (
        <div className="component-demo-local-wrapper">
            <OriginalComponent/>
        </div>
    );
}