import * as React from 'react';

import './LongContent.css';

export interface Props {
    numberOfLines: number;
}

export function LongContent({numberOfLines}: Props) {
    return (
        <div className="LongContent">
            Content
        </div>
    );
}