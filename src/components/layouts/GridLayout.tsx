import * as React from 'react';
import './GridLayout.css';

export interface LayoutProps {
    children: JSX.Element[];
}

const GridLayout = ({children}: LayoutProps) => {
    return (
        <div className="grid-layout">
            {children}
        </div>
    );
};

export default GridLayout;