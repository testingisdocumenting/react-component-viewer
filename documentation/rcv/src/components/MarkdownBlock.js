import * as React from 'react'

import Prism from 'prismjs'

import 'prismjs/components/prism-typescript'
import 'prismjs/plugins/line-highlight/prism-line-highlight'

import 'prismjs/themes/prism.css'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'

const marked = require('marked')

export class MarkdownBlock extends React.Component {
    render() {
        const {markdown} = this.props

        return (
            <div className="MarkdownBlock" dangerouslySetInnerHTML={{__html: htmlFromVarValue(markdown)}}/>
        )
    }

    componentDidMount() {
        Prism.highlightAll()
    }

    componentDidUpdate() {
        Prism.highlightAll()
    }
}

export function htmlFromVarValue(value) {
    return marked(value.trim())
}