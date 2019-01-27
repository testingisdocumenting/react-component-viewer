import * as React from 'react'

export function CodeBlock({code}) {
    return (
        <div className="CodeBlock">
            <pre>
                {code}
            </pre>
        </div>
    )
}