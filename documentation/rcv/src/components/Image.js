import React from "react"

import {withPrefix} from 'gatsby'

import {Zoomable} from "./Zoomable";

import './Image.css'

export function Image({path, description}) {
    const fullPath = withPrefix(path);
    return (
        <Zoomable>
            <div className="image">
                <img src={fullPath} srcSet={fullPath + " 2x"} alt={description}/>
            </div>
        </Zoomable>
    )
}