import * as React from 'react';

import './Toolbar.css';
import { FullScreenIcon } from './FullScreenIcon';

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
                <div
                    className="rcw-toolbar-action"
                    title="Full Screen (Alt+F)"
                    onClick={this.props.actions.onFullScreen}
                >
                    <FullScreenIcon/>
                </div>
            </div>
        );
    }

    componentDidMount() {
        document.addEventListener('keydown', this.onKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.onKeyDown);
    }

    onKeyDown = (e: object) => {
        // @ts-ignore
        if (e.altKey && e.code === 'KeyF') {
            this.props.actions.onFullScreen();
        }
    }
}