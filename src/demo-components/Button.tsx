import * as React from 'react';

import './Button.css';

export interface Props {
    label: string;
    onClick: () => void;
}

export function Button({label, onClick}: Props) {
    return (
        <div className="button" onClick={onClick}>
            {label}
        </div>
    );
}
