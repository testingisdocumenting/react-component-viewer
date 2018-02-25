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
        const {demoEntry} = this.props;

        if (demoEntry.isMiniApp()) {
            return this.renderMiniApp();
        } else {
            return this.renderInstances();
        }
    }

    onComponentSelect = (title: string) => {
        this.props.onInstanceSelect(title);
    }

    private renderMiniApp() {
        const {demoEntry, selectedTitle} = this.props;

        return (
            <demoEntry.layoutComponent
                selectedTitle={selectedTitle}
                demoInstancesGroup={demoEntry.demoInstances.groups[0]}
                onSelect={this.onComponentSelect}
                layoutOpts={demoEntry.layoutOpts}
            />);
    }

    private renderInstances() {
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
}

export { ComponentDemo };
