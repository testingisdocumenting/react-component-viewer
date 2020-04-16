import * as React from 'react';

import { Registries } from '../';
import { ComponentViewerStateCreator } from './ComponentViewerStateCreator';

describe('ComponentViewerStateCreator', () => {
    let registries: Registries;

    beforeAll(() => {
        registries = new Registries();
        registries.add('core')
            .registerSingle('FirstC', () => <div/>);
        registries.add('widgets')
            .registerSingle('FirstW', () => <div/>);

    });

    it('should pick the first registry, first demo and demo entry if url has no query params', () => {
        const stateCreator = new ComponentViewerStateCreator(registries);
        const state = stateCreator.stateFromUrl('/path', '');

        expect(state).toEqual({
            registryName: 'core',
            demoName: 'FirstC',
            entryTitle: 'FirstC',
            filterText: '',
            isFullScreen: false,
            isHelpOn: false,
            selectedToolbarItems: {}
        });
    });

    it('should take fullscreen state from url', () => {
        const stateCreator = new ComponentViewerStateCreator(registries);
        const state = stateCreator.stateFromUrl('', '_rcv_fs=true');

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
            selectedToolbarItems: {brand: 'brand_one', services: 'fake_services'}
        });

        expect(url).toEqual('_rcv_rname=core&_rcv_dname=demo-name&_rcv_fs=true' +
            '&_rcv_dropdown_brand=brand_one&_rcv_dropdown_services=fake_services');
    });

    it('should preserve false state of the full screen toggle', () => {
        const stateCreator = new ComponentViewerStateCreator(registries);
        const url = stateCreator.buildUrlSearchParams({
            registryName: '',
            demoName: '',
            entryTitle: '',
            isFullScreen: false,
            isHelpOn: false,
            filterText: '',
            selectedToolbarItems: {}
        });

        expect(url).toEqual('_rcv_fs=false');
    });

    it('should extract toolbar items from url', () => {
        const stateCreator = new ComponentViewerStateCreator(registries);
        const state = stateCreator.stateFromUrl(
            '/path',
            '_rcv_rname=core&_rcv_dropdown_brand=brand_one&_rcv_dropdown_services=fake_services');

        expect(state.selectedToolbarItems).toEqual({
            brand: 'brand_one',
            services: 'fake_services'});
    });
});