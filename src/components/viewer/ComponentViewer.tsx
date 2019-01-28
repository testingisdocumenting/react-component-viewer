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

import './ComponentViewer.css';

export interface Props {
    registries: Registry[];
    dropDown?: ComponentViewerDropDown;
}

class ComponentViewer extends Component<Props, ComponentViewerState> {
    private readonly registries: Registries;
    private readonly hotKeyBoundActions: HotKeyBoundActions;

    private stateCreator: ComponentViewerStateCreator;

    constructor(props: Props) {
        super(props);

        const {registries} = this.props;

        this.registries = new Registries(registries);
        this.stateCreator = new ComponentViewerStateCreator(this.registries);

        this.state = this.stateFromUrl();
        this.hotKeyBoundActions = {
            'Alt F': this.onFullScreenToggle,
            ...this.dropDownKeyBoundActions()
        };
    }

    render() {
        const {
            demoName,
            isFullScreen
        } = this.state;

        const registry = this.findSelectedRegistry();
        const demoEntry = registry ? registry.findByName(demoName) : null;

        const rendered = demoEntry && (demoEntry.isMiniApp() || isFullScreen) ?
            this.renderDemo(demoEntry, true) :
            this.renderSelectionPanelAndDemo(demoEntry);

        return (
            <React.Fragment>
                <GlobalHotKeysHandler keyBoundActions={this.hotKeyBoundActions}/>
                {rendered}
            </React.Fragment>
        );
    }

    renderSelectionPanelAndDemo(demoEntry: DemoEntry | null) {
        const {dropDown} = this.props;

        const {
            registryName,
            demoName,
            filterText,
            selectedToolbarItem
        } = this.state;

        return (
            <div className="rcv-component-viewer">
                <div className="rcv-registry-selection-panel">
                    <RegistrySelection
                        names={this.registries.names}
                        selectedName={registryName}
                        onSelect={this.selectRegistry}
                    />
                </div>

                <div className="rcv-toolbar-panel">
                    <Toolbar
                        onFullScreen={this.onFullScreenToggle}
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
        this.pushUrl(
            this.state.registryName,
            this.state.demoName,
            this.state.entryTitle,
            !this.state.isFullScreen,
            this.state.selectedToolbarItem);
    }

    private selectRegistry = (registryName: string) => {
        this.pushUrl(
            registryName,
            '',
            '',
            this.state.isFullScreen,
            this.state.selectedToolbarItem);
    }

    private selectDemo = (demoName: string) => {
        this.pushUrl(
            this.state.registryName,
            demoName,
            '',
            this.state.isFullScreen,
            this.state.selectedToolbarItem);
    }

    private selectInstanceByTitle = (title: string) => {
        this.pushUrl(
            this.state.registryName,
            this.state.demoName,
            title,
            this.state.isFullScreen,
            this.state.selectedToolbarItem);
    }

    private selectToolbarItem = (label: string) => {
        const {dropDown} = this.props;

        this.pushUrl(
            this.state.registryName,
            this.state.demoName,
            this.state.entryTitle,
            this.state.isFullScreen,
            label);

        if (dropDown) {
            dropDown.onSelect(label);
        }
    }

    private findSelectedRegistry() {
        const {registryName} = this.state;
        return this.registries.registryByName(registryName);
    }

    private get demoNames() {
        const {filterText} = this.state;

        const registry = this.findSelectedRegistry();

        return registry ?
            registry.names.filter(name => name.toLocaleLowerCase().indexOf(filterText.toLowerCase()) >= 0) :
            [];
    }

    private pushUrl(
        registryName: string,
        demoName: string,
        entryTitle: string,
        isFullScreen: boolean,
        selectedToolbarItem: string
    ) {
        const searchParams = this.stateCreator.buildUrlSearchParams(
            {registryName, demoName, entryTitle, isFullScreen, selectedToolbarItem, filterText: ''});
        const newUrl = '?' + searchParams;

        window.history.pushState({}, '', newUrl);
        this.updateStateFromUrl();
    }

    private onFilterTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({filterText: e.currentTarget.value});
    }
}

export { ComponentViewer };
