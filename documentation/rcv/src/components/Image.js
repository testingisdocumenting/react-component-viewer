import React from "react"

import {withPrefix} from 'gatsby'

import {Zoomable} from "./Zoomable";

import './Image.css'

export function Image({path, description}) {
    return (
        <Zoomable>
            <div className="image">
                <img src={withPrefix(path)} alt={description}/>
            </div>
        </Zoomable>
    )
}