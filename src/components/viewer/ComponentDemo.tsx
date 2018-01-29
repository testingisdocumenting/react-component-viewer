import * as React from 'react';
import { Component } from 'react';

import ComponentWithDescription from './ComponentWithDescription';

import { Header } from '../registry/Header';
import { LayoutProps } from '../layouts/GridLayout';

export interface Props {
    name: string;
    layoutComponent: React.ComponentClass<LayoutProps> | React.StatelessComponent<LayoutProps>;
    instancesWithDescription: {[name: string]: JSX.Element };
}

class ComponentDemo extends Component<Props> {
    render() {
        const {layoutComponent, instancesWithDescription} = this.props;
        const Layout = layoutComponent;

        const layoutItems = Object.keys(instancesWithDescription).map(description =>
            createComponent(description, instancesWithDescription[description]));

        return (
            <div>
                <Layout>
                    {layoutItems}
                </Layout>
            </div>
        );
    }
}

function createComponent(description: string, componentInstance: JSX.Element) {
    if (componentInstance.type === Header) {
        return React.cloneElement(componentInstance, {key: description, label: description});
    }

    return (
        <ComponentWithDescription
            key={description}
            description={description}
            componentInstance={componentInstance}
        />
    );
}

export default ComponentDemo;
