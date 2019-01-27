import React from "react"
import {CodeBlock} from "../components/CodeBlock";

export default () => <div>
    Doc Placeholder

    <CodeBlock code={codeExample()}/>
</div>

function codeExample() {
    return "" +
        "test"
}