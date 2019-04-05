import * as React from 'react';
import { Registry } from '..';
import { NavigateToUrlWrapper } from './NavigateToUrlWrapper';

export function createRegistratorForMiniApp(initialUrl: string, urlRegexp: RegExp, miniApp: React.ComponentType) {
    return function miniAppRegistrator(registry: Registry) {
        registry.add(initialUrl, () => (
            <NavigateToUrlWrapper
                initialUrl={initialUrl}
                urlRegexp={urlRegexp}
                component={miniApp}
            />)
        );
    };
}

export function createRegistratorForSingle(name: string, singleComponent: React.ComponentType) {
    const SingleComponent = singleComponent;

    return function singleComponentRegistrator(registry: Registry) {
        registry.add(name, () => (<SingleComponent/>));
    };
}