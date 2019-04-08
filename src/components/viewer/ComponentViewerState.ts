export interface ComponentViewerState {
    registryName: string;
    demoName: string;
    entryTitle: string;
    isFullScreen: boolean;
    isHelpOn: boolean;
    filterText: string;
    selectedToolbarItems: {[labelKey: string]: string};
}
