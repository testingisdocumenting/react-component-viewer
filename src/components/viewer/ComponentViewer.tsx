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

import { ComponentViewerDropDown } from './ComponentViewerDropDown';

import { ComponentViewerHelp } from './help/ComponentViewerHelp';
import { globalActionDefaultKeys } from './GlobalActions';

import { VisualizedActions } from '../actions/VisualizedActions';

import './ComponentViewer.css';

export interface Props {
    registries: Registries;
    dropDown?: ComponentViewerDropDown;
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
    }

    render() {
        const {
            demoName,
            isFullScreen
        } = this.state;

        const registry = this.findSelectedRegistry();
        const demoEntry = registry ? registry.findDemoByName(demoName) : null;

        const rendered = demoEntry && (demoEntry.isMiniApp() || isFullScreen) ?
            this.renderDemo(demoEntry, true) :
            this.renderSelectionPanelAndDemo(demoEntry);

        return (
            <React.Fragment>
                <GlobalHotKeysHandler keyBoundActions={this.hotKeyBoundActions}/>
                {rendered}
                <VisualizedActions/>
            </React.Fragment>
        );
    }

    renderSelectionPanelAndDemo(demoEntry: DemoEntry | null) {
        const {registries, dropDown} = this.props;

        const {
            registryName,
            demoName,
            filterText,
            selectedToolbarItem,
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
                        onQuestionMarkClick={this.onQuestionMarkToggle}
                        dropDownLabel={dropDown ? dropDown.label : undefined}
                        dropDownSelected={selectedToolbarItem}
                        dropDownItems={dropDown ? dropDown.items : undefined}
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
        this.updateStateFromUrl(this.triggerDropDownSelection);
        this.subscribeToUrlChanges();
    }

    stateFromUrl() {
        return this.stateCreator.stateFromUrl(document.location.search);
    }

    updateStateFromUrl = (callback?: () => void) => {
        this.setState(this.stateFromUrl(), callback);
    }

    triggerDropDownSelection() {
        const {dropDown} = this.props;
        if (!dropDown) {
            return;
        }

        const {selectedToolbarItem} = this.state;
        if (selectedToolbarItem.length > 0) {
            dropDown.onSelect(selectedToolbarItem);
        }
    }

    componentWillUnmount() {
        this.unsubscribeFromUrlChanges();
    }

    private dropDownKeyBoundActions() {
        const result: HotKeyBoundActions = {};

        const {dropDown} = this.props;
        if (!dropDown) {
            return result;
        }

        dropDown.items
            .filter(item => !!item.hotKey)
            .forEach(item => result[item.hotKey!] = () => this.selectToolbarItem(item.label));

        return result;
    }

    private subscribeToUrlChanges() {
        window.addEventListener('popstate', () => this.updateStateFromUrl());
    }

    private unsubscribeFromUrlChanges() {
        window.removeEventListener('popstate', () => this.updateStateFromUrl());
    }

    private onFullScreenToggle = () => {
        this.pushUrl({isFullScreen: !this.state.isFullScreen});
    }

    private onQuestionMarkToggle = () => {
        this.pushUrl({isHelpOn: !this.state.isHelpOn});
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
        this.pushUrl({
            registryName,
            demoName: '',
            entryTitle: ''});
    }

    private selectDemo = (demoName: string) => {
        this.pushUrl({demoName, entryTitle: ''});
    }

    private selectInstanceByTitle = (title: string) => {
        this.pushUrl({entryTitle: title});
    }

    private selectToolbarItem = (label: string) => {
        const {dropDown} = this.props;

        this.pushUrl({selectedToolbarItem: label});

        if (dropDown) {
            dropDown.onSelect(label);
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

    private pushUrl(newState: Partial<ComponentViewerState>) {
        const fullState = {...this.state, ...newState};
        const searchParams = this.stateCreator.buildUrlSearchParams({...fullState, filterText: ''});
        const newUrl = '?' + searchParams;

        window.history.pushState({}, '', newUrl);
        this.updateStateFromUrl();
    }

    private onFilterTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({filterText: e.currentTarget.value});
    }
}

export { ComponentViewer };
