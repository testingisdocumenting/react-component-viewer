import * as React from 'react';
import { Component } from 'react';

import { LabeledInstance } from './LabeledInstance';

import { ComponentInstances } from '../registry/ComponentInstances';
import { DescriptionAndInstance } from '../registry/DescriptionAndInstance';

export interface Props {
    componentInstances: ComponentInstances;
}

class ComponentDemo extends Component<Props> {
    render() {
        const {componentInstances} = this.props;

        const layoutItems = componentInstances.namedInstances.map(namedInstance =>
            renderComponent(namedInstance));

        const layout = React.cloneElement(componentInstances.layoutInstance, {}, layoutItems);
        return (
            <div>
                {layout}
            </div>
        );
    }
}

function renderComponent(nameAndInstance: DescriptionAndInstance) {
    // if (componentInstance.type === Header) {
    //     return React.cloneElement(componentInstance, {key: description, label: description});
    // }

    return (
        <LabeledInstance
            key={nameAndInstance.DescriptionAndInstance}
            name={nameAndInstance.DescriptionAndInstance}
            element={nameAndInstance.instance}
        />
    );
}

export {ComponentDemo};
