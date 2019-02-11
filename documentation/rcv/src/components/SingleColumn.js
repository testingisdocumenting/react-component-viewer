import React from 'react'
import './SingleColumn.css'

export function SingleColumn({children}) {
    return (
        <div className="single-column">
            {children}
        </div>
    )
}
