import * as React from 'react';
import { Registry } from '..';
import { MiniAppUrlsSelection } from '../miniapp/MiniAppUrlsSelection';

export function createRegistratorForMiniApp(name: string,
                                            urlRegexp: RegExp,
                                            urlsByLabel: { [label: string]: string },
                                            miniApp: React.ComponentType) {
    return function miniAppRegistrator(registry: Registry) {
        registry.add(name, () => (
            <MiniAppUrlsSelection
                urlsByLabel={urlsByLabel}
                urlRegexp={urlRegexp}
                component={miniApp}
            />));
    };
}

export function createRegistratorForSingle(name: string, singleComponent: React.ComponentType) {
    const SingleComponent = singleComponent;

    return function singleComponentRegistrator(registry: Registry) {
        registry.add(name, () => (<SingleComponent/>));
    };
}