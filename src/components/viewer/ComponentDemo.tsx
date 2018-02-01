import * as React from 'react';
import { Component } from 'react';

import { DemoEntry } from '../registry/DemoEntry';

export interface Props {
    componentInstances: DemoEntry;
    selectedTitle: string;
    onInstanceSelect: (name: string) => void;
}

class ComponentDemo extends Component<Props> {
    render() {
        const {componentInstances, selectedTitle} = this.props;

        return (
            <div>
                <componentInstances.layoutComponent
                    selectedTitle={selectedTitle}
                    instancesWithDescription={componentInstances.instancesWithDescription}
                    onSelect={this.onComponentSelect}
                />
            </div>
        );
    }

    onComponentSelect = (title: string) => {
        this.props.onInstanceSelect(title);
    }
}

export {ComponentDemo};
