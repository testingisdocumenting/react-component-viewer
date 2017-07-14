import React from 'react'
import './GridLayout.css'

const GridLayout = ({children}) => {
    return (
        <div className="grid-layout">
            {children}
        </div>
    )
};

export default GridLayout;