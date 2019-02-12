import * as React from 'react';

import './Button.css';

export interface Props {
    primary?: boolean;
    label: string;
    onClick: () => void;
}

export function Button({label, primary, onClick}: Props) {
    const className = 'button' + (primary ? ' primary' : '');

    return (
        <div className={className} onClick={onClick}>
            {label}
        </div>
    );
}
