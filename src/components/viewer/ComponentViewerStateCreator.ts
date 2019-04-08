import 'url-search-params-polyfill';

import { ComponentViewerState } from './ComponentViewerState';
import { Registry, Registries } from '../';
import { DemoEntryAndRegistry } from '../registry/DemoEntryAndRegistry';

const queryParamNames = {
    registryName: '_rcv_rname',
    demoName: '_rcv_dname',
    entryTitle: '_rcv_title',
    selectedToolbarItemPrefix: '_rcv_dropdown_',
    isFullScreen: '_rcv_fs',
    isHelpOn: '_rcv_help'
};

export class ComponentViewerStateCreator {
    private _registries: Registries;

    private static firstDemoName(registry: Registry | null) {
        return registry ? registry.names[0] : '';
    }

    private static firstTitleByDemoName(registry: Registry | null, name: string) {
        const demoEntry = registry ? registry.findDemoByName(name) : null;
        return demoEntry ? demoEntry.firstEntryTitle : '';
    }

    constructor(registries: Registries) {
        this._registries = registries;
    }

    stateFromUrl(path: string, search: string): ComponentViewerState {
        const searchParams = new URLSearchParams(search);

        const selectedToolbarItems = extractSelectedToolbarItems();

        const miniAppByUrl = this.miniAppByUrl(path + '?' + search);
        if (miniAppByUrl) {
            return {
                registryName: miniAppByUrl.registry.name,
                demoName: miniAppByUrl.demoEntry.name,
                entryTitle: miniAppByUrl.demoEntry.firstEntryTitle,
                isFullScreen: true,
                isHelpOn: false,
                filterText: '',
                selectedToolbarItems
            };
        }

        const registryName = searchParams.get(queryParamNames.registryName) || this._registries.first.name;
        const registry = this._registries.registryByName(registryName);

        const demoName = searchParams.get(queryParamNames.demoName) ||
            ComponentViewerStateCreator.firstDemoName(registry);

        const entryTitle = searchParams.get(queryParamNames.entryTitle) ||
            ComponentViewerStateCreator.firstTitleByDemoName(registry, demoName);

        const fullScreenValue = searchParams.get(queryParamNames.isFullScreen) || 'false';
        const isFullScreen = fullScreenValue === 'true';

        const helpOnValue = searchParams.get(queryParamNames.isHelpOn) || 'false';
        const isHelpOn = helpOnValue === 'true';

        return {
            registryName,
            demoName,
            entryTitle,
            isFullScreen,
            isHelpOn,
            selectedToolbarItems,
            filterText: ''
        };

        function extractSelectedToolbarItems(): {[key: string]: string} {
            const result = {};

            // @ts-ignore
            Array.from(searchParams.keys()).forEach((k: string) => {
                if (k.indexOf(queryParamNames.selectedToolbarItemPrefix) === 0) {
                    result[k.substring(queryParamNames.selectedToolbarItemPrefix.length)] = searchParams.get(k);
                }
            });

            return result;
        }
    }

    buildUrlSearchParams(state: ComponentViewerState): string {
        const searchParams = new URLSearchParams();

        Object.keys(state).forEach(k => {
            const v = state[k];

            if (k === 'selectedToolbarItems') {
                const toolbarItems: {[labelKey: string]: string} = v;
                Object.keys(v).forEach(dropDownLabelKey => searchParams.set(
                    queryParamNames.selectedToolbarItemPrefix + dropDownLabelKey, toolbarItems[dropDownLabelKey]));
            } else if (v) {
                searchParams.set(queryParamNames[k], v.toString());
            }
        });

        return searchParams.toString();
    }

    private miniAppByUrl(url: string): DemoEntryAndRegistry | null {
        const foundDemos = this._registries.registries
            .map(r => ({miniApp: r.firstMiniAppByUrl(url), registry: r}))
            .filter(found => found.miniApp !== null);

        return foundDemos.length > 0 ?
            {demoEntry: foundDemos[0].miniApp, registry: foundDemos[0].registry} as DemoEntryAndRegistry :
            null;
    }
}