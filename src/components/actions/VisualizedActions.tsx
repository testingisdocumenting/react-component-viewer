import * as React from 'react';
import { actionsListener } from './ActionsListener';
import { ActionListener } from './ActionListener';
import Timer = NodeJS.Timer;

import './VisualizedActions.css';

export interface State {
    actionLabelToShow?: string;
    timer?: Timer;
}

export class VisualizedActions extends React.Component<{}, State> {
    state: State = {
    };

    private actionListener: ActionListener;

    constructor(props: {}) {
        super(props);
        this.actionListener = {
            onAction: this.onNewAction
        };
    }

    render() {
        const {actionLabelToShow} = this.state;

        return (
            <div className="rcv-visualized-actions">
                {actionLabelToShow &&
                    <div className="rcv-visualized-action">{actionLabelToShow}</div>
                }
            </div>
        );
    }

    componentDidMount() {
        actionsListener.add(this.actionListener);
    }

    componentWillUnmount() {
        actionsListener.remove(this.actionListener);
    }

    private removeActions = () => {
        this.setState({actionLabelToShow: undefined});
    }

    private onNewAction = (label: string) => {
        this.setState(prev => {
            if (prev.timer) {
                clearTimeout(prev.timer);
            }

            return {
                actionLabelToShow: label,
                timer: setTimeout(this.removeActions, 3000)
            };
        });
    }
}