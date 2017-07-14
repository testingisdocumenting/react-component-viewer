import React from 'react';

import './ComponentWithDescription.css'

const ComponentWithDescription = ({description, componentInstance}) => {
    return (
        <div className="component-with-description">
            <div className="description">
                {description}
            </div>

            <div className="component-preview">
                {componentInstance}
            </div>
        </div>
    )
};

export default ComponentWithDescription;
