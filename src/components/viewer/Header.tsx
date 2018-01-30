import './Header.css';

import * as React from 'react';

export interface Props {
    label: string;
}

const Header = ({label}: Props) => <div className="header">{label}</div>;

export {Header};
