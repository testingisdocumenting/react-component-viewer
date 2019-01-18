import * as React from 'react';
import { Component } from 'react';

import { Registry } from '../registry/Registry';
import { Registries } from '../registry/Registries';

import { ComponentDemo } from './ComponentDemo';

import { RegistrySelection } from './RegistrySelection';
import { TableOfContents } from './toc/TableOfContents';

import { Toolbar } from './toolbar/Toolbar';
import { ComponentsViewerState } from './ComponentsViewerState';
import { ComponentsViewerStateCreator } from './ComponentsViewerStateCreator';

import { DemoEntry } from '../registry/DemoEntry';

import { GlobalHotKeysHandler } from '../hotkeys/GlobalHotKeysHandler';

import { HotKeyBoundActions } from '../hotkeys/HotKeyBoundActions';
import { ComponentViewerDropDownItem } from './ComponentViewerDropDownItem';

import { ToolbarDropDownItem } from './toolbar/ToolbarDropDownItem';

import { hotKeyFromString } from '../hotkeys/hotKeyBuilder';

import { ComponentViewerDropDown } from './ComponentViewerDropDown';

import './ComponentsViewer.css';

export interface Props {
    registries: Registry[];
    dropDown?: ComponentViewerDropDown;
}

class ComponentsViewer extends Component<Props, ComponentsViewerState> {
    private _registries: Registries;
    private _stateCreator: ComponentsViewerStateCreator;

    private _hotKeyBoundActions: HotKeyBoundActions;

    private _dropDownItems: ToolbarDropDownItem[];

    constructor(props: Props) {
        super(props);

        const {registries} = this.props;

        this._registries = new Registries(registries);
        this._stateCreator = new ComponentsViewerStateCreator(this._registries);

        this.state = this.stateFromUrl();
        this._hotKeyBoundActions = {'Alt F': this.onFullScreenToggle};

        this._dropDownItems = props.dropDown ? convertDropDownItems(props.dropDown.items) : [];
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
                <GlobalHotKeysHandler keyBoundActions={this._hotKeyBoundActions}/>
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
            <div className="rcw-components-viewer">
                <div className="rcw-registry-selection-panel">
                    <RegistrySelection
                        names={this._registries.names}
                        selectedName={registryName}
                        onSelect={this.selectRegistry}
                    />
                </div>

                <div className="rcw-toolbar-panel">
                    <Toolbar
                        onFullScreen={this.onFullScreenToggle}
                        dropDownLabel={dropDown ? dropDown.label : undefined}
                        dropDownSelected={selectedToolbarItem}
                        dropDownItems={this._dropDownItems}
                        onDropDownItemSelection={this.selectToolbarItem}
                    />
                </div>

                <div className="rcw-search-box">
                    <input
                        className="rcw-search-box-input"
                        value={filterText}
                        placeholder="filter by demo name..."
                        onChange={this.onFilterTextChange}
                    />
                </div>

                <div className="rcw-toc-panel">
                    <TableOfContents
                        names={this.demoNames}
                        selectedName={demoName}
                        onSelect={this.selectDemo}
                    />
                </div>

                <div className="rcw-preview">
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
        return this._stateCreator.stateFromUrl(document.location.search);
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
        return this._registries.registryByName(registryName);
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
        const searchParams = this._stateCreator.buildUrlSearchParams(
            {registryName, demoName, entryTitle, isFullScreen, selectedToolbarItem, filterText: ''});
        const newUrl = '?' + searchParams;

        window.history.pushState({}, '', newUrl);
        this.updateStateFromUrl();
    }

    private onFilterTextChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({filterText: e.currentTarget.value});
    }
}

function convertDropDownItems(dropDownItems: ComponentViewerDropDownItem[]) {
    return dropDownItems ?
        dropDownItems.map(item => (
            {
                label: item.label,
                hotKey: item.hotKey ? hotKeyFromString(item.hotKey) : undefined
            })) : [];
}

export { ComponentsViewer };
