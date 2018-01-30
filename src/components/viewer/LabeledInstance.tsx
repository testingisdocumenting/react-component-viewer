import * as React from 'react';

import './LabeledInstance.css';

export interface Props {
    name: string;
    element: JSX.Element;
}

const LabeledInstance = ({name, element}: Props) => {
    return (
        <div className="labeled-instance">
            <div className="description">
                {name}
            </div>

            <div className="component-preview">
                {element}
            </div>
        </div>
    );
};

export { LabeledInstance };
