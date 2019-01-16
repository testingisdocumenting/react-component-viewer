import * as React from 'react';

import { Registries, Registry } from '../';
import { ComponentsViewerStateCreator } from './ComponentsViewerStateCreator';

describe('ComponentsViewerStateCreator', () => {
    let registryA: Registry;
    let registryB: Registry ;

    let registries: Registries;

    beforeAll(() => {
        registryA = new Registry('core');
        registryA.registerSingle('FirstC', (registry => registry.add('title-c-a', () => <div/>)));

        registryB = new Registry('widgets');
        registryA.registerSingle('FirstW', (registry => registry.add('title-w-a', () => <div/>)));

        registries = new Registries([registryA, registryB]);
    });

    it('should pick the first registry, first demo and demo entry if url has no query params', () => {
        const stateCreator = new ComponentsViewerStateCreator(registries);
        const state = stateCreator.stateFromUrl('/path');

        expect(state).toEqual({
            registryName: 'core',
            demoName: 'FirstC',
            entryTitle: 'title-c-a',
            filterText: '',
            isFullScreen: false
        });
    });

    it('should take fullscreen state from url', () => {
        const stateCreator = new ComponentsViewerStateCreator(registries);
        const state = stateCreator.stateFromUrl('fullScreen=true');

        expect(state.isFullScreen).toEqual(true);
    });

    it('should build url search params based on state', () => {
        const stateCreator = new ComponentsViewerStateCreator(registries);
        const url = stateCreator.buildUrlSearchParams({
            registryName: 'core',
            demoName: 'demo-name',
            entryTitle: '',
            isFullScreen: true,
            filterText: ''
        });

        expect(url).toEqual('registryName=core&demoName=demo-name&fullScreen=true');
    });
});