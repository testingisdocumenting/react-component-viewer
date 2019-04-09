import * as React from 'react';
import { currentUrlMatchesRegexp } from './urlUtils';

export interface Props {
    component: React.ComponentType;
    urlRegexp: RegExp;
    urlsByLabel: { [label: string]: string };
}

export function MiniAppUrlsSelection({component: Component, urlRegexp, urlsByLabel}: Props) {
    const renderComponent = currentUrlMatchesRegexp(urlRegexp);

    if (renderComponent) {
        return <Component/>;
    }

    return (
        <div>
            {Object.keys(urlsByLabel).map(label => (
                <div>
                    <a href={urlsByLabel[label]}>{label}</a>
                </div>
            ))}
        </div>
    );
}