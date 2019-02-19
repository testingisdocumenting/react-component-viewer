import React from "react"

import {MarkdownBlock} from "../components/MarkdownBlock";
import {Layout} from "../components/Layout";
import {LeftSide, RightSide, TwoSides} from "../components/TwoSides";
import {Image} from "../components/Image";
import {SingleColumn} from "../components/SingleColumn";

export default () => (
    <Layout>
        <SingleColumn>
            <MarkdownBlock markdown="# React Component Viewer"/>
            <Image path={'/screen-example.png'} description="example output"/>

            <MarkdownBlock markdown={intro()}/>
            <MarkdownBlock markdown={rest()}/>
        </SingleColumn>
    </Layout>
)

// language=Markdown
function intro() {
    return `
Is a React component to preview and develop your components.
Use it in your CRA created app as a demo app.
 
\`\`\` typescript
import * as React from 'react';

import { Registry, ComponentViewer } from 'react-component-viewer';

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
\`\`\`    

It will work with your build system, the language of your choice and style processing.

`
}

// language=Markdown
function rest() {
    return `
# Demo functions

Demo must be defined in a function that accepts \`Registry\`. Function should register components to display.

\`\`\`typescript
export function buttonsDemo(registry: Registry) {
    registry
        .add('enabled', () => <Button label="click me" 
                                      onClick={onClick}/>)
        .add('disabled', () => <Button label="click me"  
                                       enabled={false} 
                                       onClick={onClick}/>)
}
\`\`\` 

# Installation

    npm install react-component-viewer --save-dev 
`
}