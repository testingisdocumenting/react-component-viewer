import * as React from 'react';
import { Component } from 'react';

import { Registry } from '../registry/Registry';
import { Registries } from '../registry/Registries';

import { ComponentDemo } from './ComponentDemo';

import { RegistrySelection } from './RegistrySelection';
import { TableOfContents } from './toc/TableOfContents';

import { Toolbar } from './toolbar/Toolbar';
import { ComponentViewerState } from './ComponentViewerState';
import { ComponentViewerStateCreator } from './ComponentViewerStateCreator';

import { DemoEntry } from '../registry/DemoEntry';

import { GlobalHotKeysHandler } from '../hotkeys/GlobalHotKeysHandler';

import { HotKeyBoundActions } from '../hotkeys/HotKeyBoundActions';

import { ComponentViewerHelp } from './help/ComponentViewerHelp';
import { globalActionDefaultKeys } from './GlobalActions';

import { VisualizedActions } from '../actions/VisualizedActions';

import { labelToKey } from './dropdown/labelUtils';
import { DropDowns } from './dropdown/DropDowns';

import './ComponentViewer.css';

export interface Props {
    registries: Registries;
    dropDowns: DropDowns;
}

class ComponentViewer extends Component<Props, ComponentViewerState> {
    private readonly hotKeyBoundActions: HotKeyBoundActions;

    private stateCreator: ComponentViewerStateCreator;

    constructor(props: Props) {
        super(props);

        const {registries} = this.props;

        this.stateCreator = new ComponentViewerStateCreator(registries);

        this.state = this.stateFromUrl();
        this.hotKeyBoundActions = {
            [globalActionDefaultKeys.fullScreenToggle]: this.onFullScreenToggle,
            [globalActionDefaultKeys.nextDemo]: this.onNextDemo,
            [globalActionDefaultKeys.prevDemo]: this.onPrevDemo,
            [globalActionDefaultKeys.nextDemoEntry]: this.onNextDemoEntry,
            [globalActionDefaultKeys.prevDemoEntry]: this.onPrevDemoEntry,
            ...this.dropDownKeyBoundActions()
        };

        this.triggerDropDownSelection();
    }

    render() {
        const {
            demoName,
            isFullScreen
        } = this.state;

        const registry = this.findSelectedRegistry();
        const demoEntry = registry ? registry.findDemoByName(demoName) : null;

        const rendered = demoEntry && isFullScreen ?
            this.renderDemo(demoEntry, true) :
            this.renderSelectionPanelAndDemo(demoEntry);

        return (
            <div>
                <GlobalHotKeysHandler keyBoundActions={this.hotKeyBoundActions}/>
                {rendered}
                <VisualizedActions/>
            </div>
        );
    }

    renderSelectionPanelAndDemo(demoEntry: DemoEntry | null) {
        const {registries, dropDowns} = this.props;

        const {
            registryName,
            demoName,
            filterText,
            selectedToolbarItems,
            isHelpOn
        } = this.state;

        return (
            <div className="rcv-component-viewer">
                <div className="rcv-registry-selection-panel">
                    <RegistrySelection
                        names={registries.names}
                        selectedName={registryName}
                        onSelect={this.selectRegistry}
                    />
                </div>

                <div className="rcv-toolbar-panel">
                    <Toolbar
                        questionMarkToggledOn={isHelpOn}
                        dropDowns={dropDowns}
                        selectedItems={selectedToolbarItems}
                        onQuestionMarkClick={this.onQuestionMarkToggle}
                        onDropDownItemSelection={this.selectToolbarItem}
                    />
                </div>

                <div className="rcv-search-box">
                    <input
                        className="rcv-search-box-input"
                        value={filterText}
                        placeholder="filter by demo name..."
                        onChange={this.onFilterTextChange}
                    />
                </div>

                <div className="rcv-toc-panel">
                    <TableOfContents
                        names={this.demoNames}
                        selectedName={demoName}
                        onSelect={this.selectDemo}
                    />
                </div>

                <div className="rcv-preview">
                    {this.renderDemo(demoEntry, false)}
                </div>

                {isHelpOn && <div className="rcv-help">
                    <ComponentViewerHelp/>
                </div>}
            </div>
        );
    }

    renderDemo(demoEntry: DemoEntry | null, onlySelected: boolean) {
        const {registryName, demoName, entryTitle} = this.state;

        if (!demoEntry) {
            return (
                <div>Can't find demo entry: {registryName} -> {demoName}</div>
            );
        }

        return (
            <ComponentDemo
                demoEntry={demoEntry}
                selectedTitle={entryTitle}
                onlySelected={onlySelected}
                onInstanceSelect={this.selectInstanceByTitle}
            />
        );
    }

    componentDidMount() {
        this.subscribeToUrlChanges();
    }

    stateFromUrl() {
        return this.stateCreator.stateFromUrl(document.location.pathname, document.location.search);
    }

    updateStateFromUrl = (callback?: () => void) => {
        this.setState(this.stateFromUrl(), callback);
    }

    triggerDropDownSelection() {
        const {dropDowns} = this.props;
        if (dropDowns.isEmpty()) {
            return;
        }

        const {selectedToolbarItems} = this.state;
        Object.keys(selectedToolbarItems).forEach(dropDownKey => {
            const dropDown = dropDowns.findDropDownByLabelKey(dropDownKey);
            if (!dropDown) {
                return;
            }

            const itemKey = selectedToolbarItems[dropDownKey];
            const item = dropDown.findItemByLabelKey(itemKey);
            if (item) {
                dropDown.triggerSelectHandler(item.label);
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromUrlChanges();
    }

    private dropDownKeyBoundActions() {
        const result: HotKeyBoundActions = {};

        const {dropDowns} = this.props;
        if (dropDowns.isEmpty()) {
            return result;
        }

        dropDowns.list.forEach(dropDown =>
            dropDown.items
                .filter(item => !!item.hotKey)
                .forEach(item => result[item.hotKey!] =
                    () => this.selectToolbarItem(dropDown.label, item.label)));

        return result;
    }

    private subscribeToUrlChanges() {
        window.addEventListener('popstate', () => this.updateStateFromUrl());
    }

    private unsubscribeFromUrlChanges() {
        window.removeEventListener('popstate', () => this.updateStateFromUrl());
    }

    private onFullScreenToggle = () => {
        this.pushUrl({partialState: {isFullScreen: !this.state.isFullScreen}});
    }

    private onQuestionMarkToggle = () => {
        this.pushUrl({partialState: {isHelpOn: !this.state.isHelpOn}});
    }

    private onNextDemo = () => {
        this.withRegistryAndDemoNameWhenPresent(((registry, demoName) => {
            const nextDemo = registry.findNextDemoByCurrentName(demoName);
            this.selectDemo(nextDemo.name);
        }));
    }

    private onPrevDemo = () => {
        this.withRegistryAndDemoNameWhenPresent(((registry, demoName) => {
            const prevDemo = registry.findPrevDemoByCurrentName(demoName);
            this.selectDemo(prevDemo.name);
        }));
    }

    private onNextDemoEntry = () => {
        this.withRegistryAndDemoAndTitleWhenPresent(((registry, demo, title) => {
            this.selectInstanceByTitle(demo.findNextInstanceByCurrentTitle(title).title);
        }));
    }

    private onPrevDemoEntry = () => {
        this.withRegistryAndDemoAndTitleWhenPresent(((registry, demo, title) => {
            this.selectInstanceByTitle(demo.findPrevInstanceByCurrentTitle(title).title);
        }));
    }

    private withRegistryAndDemoNameWhenPresent = (code: (registry: Registry, demoName: string) => void) => {
        const registry = this.findSelectedRegistry();
        const {demoName} = this.state;

        if (!registry) {
            return;
        }

        code(registry, demoName);
    }

    private withRegistryAndDemoAndTitleWhenPresent = (
        code: (registry: Registry, demo: DemoEntry, title: string) => void
    ) => {
        this.withRegistryAndDemoNameWhenPresent(((registry, demoName) => {
            const demo = registry.findDemoByName(demoName);
            if (!demo) {
                return;
            }

            const {entryTitle} = this.state;
            code(registry, demo, entryTitle);
        }));
    }

    private selectRegistry = (registryName: string) => {
        this.pushUrl({partialState: {
            registryName,
            demoName: '',
            entryTitle: ''
        }, clearPath: true});
    }

    private selectDemo = (demoName: string) => {
        this.pushUrl({partialState: {demoName, entryTitle: ''}, clearPath: true});
    }

    private selectInstanceByTitle = (title: string) => {
        this.pushUrl({partialState: {entryTitle: title}, clearPath: true});
    }

    private selectToolbarItem = (dropDownLabel: string, itemLabel: string) => {
        const {dropDowns} = this.props;
        const {selectedToolbarItems} = this.state;

        this.pushUrl({partialState: {
            selectedToolbarItems: {
                ...selectedToolbarItems,
                [labelToKey(dropDownLabel)]: labelToKey(itemLabel)
            }
        }});

        const found = dropDowns.findDropDownByLabel(dropDownLabel);
        if (found) {
            found.triggerSelectHandler(itemLabel);
        }
    }

    private findSelectedRegistry() {
        const {registries} = this.props;
        const {registryName} = this.state;
        return registries.registryByName(registryName);
    }

    private get demoNames() {
        const {filterText} = this.state;

        const registry = this.findSelectedRegistry();

        return registry ?
            registry.names.filter(name => name.toLocaleLowerCase().indexOf(filterText.toLowerCase()) >= 0) :
            [];
    }

    private pushUrl({partialState, clearPath}: {partialState: Partial<ComponentViewerState>, clearPath?: boolean}) {
        const fullState = {...this.state, ...partialState};
        const searchParams = this.stateCreator.buildUrlSearchParams({...fullState, filterText: ''});
        const newUrl = (clearPath ? '/' : '' ) + '?' + searchParams;

        window.history.pushState({}, '', newUrl);
        this.updateStateFromUrl();
    }

    private onFilterTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({filterText: e.currentTarget.value});
    }
}

export { ComponentViewer };
