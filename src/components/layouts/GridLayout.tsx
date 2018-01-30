import * as React from 'react';
import './GridLayout.css';

export interface Props {
    children?: JSX.Element[];
}

const GridLayout = ({children}: Props) => {
    return (
        <div className="grid-layout">
            {children}
        </div>
    );
};

export {GridLayout};