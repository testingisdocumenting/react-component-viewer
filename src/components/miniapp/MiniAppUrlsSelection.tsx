import * as React from 'react';
import { appendUrlSearch, currentUrlMatchesRegexp } from './urlUtils';

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
            {Object.keys(urlsByLabel).map(label => {
                const url = urlsByLabel[label];
                return (
                    <div key={label}>
                        <a href={url} onClick={(e) => selectUrl(e, url)}>{label}</a>
                    </div>
                );
            })}
        </div>
    );

    function selectUrl(e: React.MouseEvent<HTMLElement>, url: string) {
        e.preventDefault();
        document.location.href = appendUrlSearch(url, document.location.search);
    }
}