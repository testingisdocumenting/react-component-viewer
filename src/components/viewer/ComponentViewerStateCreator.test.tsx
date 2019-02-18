import * as React from 'react';

import { Registries } from '../';
import { ComponentViewerStateCreator } from './ComponentViewerStateCreator';

describe('ComponentViewerStateCreator', () => {
    let registries: Registries;

    beforeAll(() => {
        registries = new Registries();
        registries.add('core')
            .registerSingle('FirstC', (registry => registry.add('title-c-a', () => <div/>)));
        registries.add('widgets')
            .registerSingle('FirstW', (registry => registry.add('title-w-a', () => <div/>)));

    });

    it('should pick the first registry, first demo and demo entry if url has no query params', () => {
        const stateCreator = new ComponentViewerStateCreator(registries);
        const state = stateCreator.stateFromUrl('/path');

        expect(state).toEqual({
            registryName: 'core',
            demoName: 'FirstC',
            entryTitle: 'title-c-a',
            filterText: '',
            isFullScreen: false,
            isHelpOn: false,
            selectedToolbarItem: ''
        });
    });

    it('should take fullscreen state from url', () => {
        const stateCreator = new ComponentViewerStateCreator(registries);
        const state = stateCreator.stateFromUrl('fullScreen=true');

        expect(state.isFullScreen).toEqual(true);
    });

    it('should build url search params based on state', () => {
        const stateCreator = new ComponentViewerStateCreator(registries);
        const url = stateCreator.buildUrlSearchParams({
            registryName: 'core',
            demoName: 'demo-name',
            entryTitle: '',
            isFullScreen: true,
            isHelpOn: false,
            filterText: '',
            selectedToolbarItem: ''
        });

        expect(url).toEqual('registryName=core&demoName=demo-name&fullScreen=true');
    });
});