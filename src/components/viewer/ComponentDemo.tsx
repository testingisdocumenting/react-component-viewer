import * as React from 'react';
import { Component } from 'react';

import { DemoEntry } from '../registry/DemoEntry';

export interface Props {
    componentInstances: DemoEntry;
    selectedDescription: string;
    onInstanceSelect: (name: string) => void;
}

class ComponentDemo extends Component<Props> {
    render() {
        const {componentInstances, selectedDescription} = this.props;

        return (
            <div>
                <componentInstances.layoutComponent
                    selectedDescription={selectedDescription}
                    instancesWithDescription={componentInstances.instancesWithDescription}
                    onSelect={this.onComponentSelect}
                />
            </div>
        );
    }

    onComponentSelect = (description: string) => {
        this.props.onInstanceSelect(description);
    }
}

export {ComponentDemo};
