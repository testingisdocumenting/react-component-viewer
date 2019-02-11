import React from "react"

import {zoomListeners} from "./ZoomListeners"

import './Zoomable.css'

export function Zoomable({children}) {
    return (
        <div className="zoomable" onClick={() => zoomListeners.notify(children)}>
            {children}
        </div>
    )
}