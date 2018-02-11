import * as React from 'react';

import { DemoEntry } from '../registry/DemoEntry';

import './ComponentDemo.css';

export interface Props {
    demoEntry: DemoEntry;
    selectedTitle: string;
    onInstanceSelect: (name: string) => void;
}

class ComponentDemo extends React.PureComponent<Props> {
    render() {
        const {demoEntry, selectedTitle} = this.props;

        return (
            <div className="rcw-component-demo">
                {demoEntry.demoInstances.groups.map((group, idx) => {
                    return (
                        <div key={idx} className="group-with-description">
                            <div className="description">{group.description}</div>
                            <demoEntry.layoutComponent
                                selectedTitle={selectedTitle}
                                demoInstancesGroup={group}
                                onSelect={this.onComponentSelect}
                                layoutOpts={demoEntry.layoutOpts}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    onComponentSelect = (title: string) => {
        this.props.onInstanceSelect(title);
    }
}

export { ComponentDemo };
