import * as React from 'react';

import './Toolbar.css';

export interface ToolbarActions {
    onFullScreen(): void;
}

export interface Props {
    actions: ToolbarActions;
}

export class Toolbar extends React.PureComponent<Props> {
    render() {
        return (
            <div className="rcw-toolbar">
                <div className="action" onClick={this.props.actions.onFullScreen}>
                    Full Screen
                </div>
            </div>
        );
    }
}