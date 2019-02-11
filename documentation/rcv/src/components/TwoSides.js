import React from 'react'
import './TwoSides.css'

export function TwoSides({children}) {
    return (
        <div className="two-side">
            {children}
        </div>
    )
}

export function LeftSide({children}) {
    return (
        <div className="left-side">
            {children}
        </div>
    )
}

export function RightSide({children}) {
    return (
        <div className="right-side">
            {children}
        </div>
    )
}