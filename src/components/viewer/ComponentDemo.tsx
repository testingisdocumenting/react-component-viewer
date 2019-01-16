import * as React from 'react';

import { DemoEntry } from '../registry/DemoEntry';

import { stateChangeListener } from '../state/StateChangeListeners';

import './ComponentDemo.css';

export interface Props {
    demoEntry: DemoEntry;
    selectedTitle: string;
    onlySelected: boolean;
    onInstanceSelect: (name: string) => void;
}

class ComponentDemo extends React.Component<Props> {
    render() {
        const {demoEntry, onlySelected} = this.props;

        if (demoEntry.isMiniApp()) {
            return this.renderMiniApp();
        } else if (onlySelected) {
            return this.renderOnlySelected();
        } else {
            return this.renderInstances();
        }
    }

    componentDidMount() {
        this.subscribeToSimulatedState();
    }

    componentWillUnmount() {
        this.unsubscribeFromSimulatedState();
    }

    private renderMiniApp() {
        const {demoEntry, selectedTitle, onInstanceSelect} = this.props;

        return (
            <demoEntry.layoutComponent
                selectedTitle={selectedTitle}
                demoInstancesGroup={demoEntry.demoInstances.groups[0]}
                onSelect={onInstanceSelect}
                layoutOpts={demoEntry.layoutOpts}
            />);
    }

    private renderOnlySelected() {
        const {demoEntry, selectedTitle} = this.props;
        const demoInstance = demoEntry.findByTitle(selectedTitle);

        return <demoInstance.component/>;
    }

    private renderInstances() {
        const {demoEntry, selectedTitle, onInstanceSelect} = this.props;

        return (
            <div className="rcw-component-demo">
                {demoEntry.demoInstances.groups.map((group, idx) => {
                    return (
                        <div key={idx} className="rcw-component-group-with-description">
                            <div className="rcw-component-group-description">{group.description}</div>
                            <demoEntry.layoutComponent
                                selectedTitle={selectedTitle}
                                demoInstancesGroup={group}
                                onSelect={onInstanceSelect}
                                layoutOpts={demoEntry.layoutOpts}
                            />
                        </div>
                    );
                })}
            </div>
        );
    }

    private subscribeToSimulatedState() {
        stateChangeListener.addListener(this.refresh);
    }

    private unsubscribeFromSimulatedState() {
        stateChangeListener.removeListener(this.refresh);
    }

    private refresh = () => {
        this.forceUpdate();
    }
}

export { ComponentDemo };
