import * as React from 'react';

import './ComponentWithDescription.css';

export interface Props {
    description: string;
    componentInstance: JSX.Element;
}

const ComponentWithDescription = ({description, componentInstance}: Props) => {
    return (
        <div className="component-with-description">
            <div className="description">
                {description}
            </div>

            <div className="component-preview">
                {componentInstance}
            </div>
        </div>
    );
};

export default ComponentWithDescription;
