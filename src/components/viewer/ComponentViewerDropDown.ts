import { ComponentViewerDropDownItem } from './ComponentViewerDropDownItem';

export interface ComponentViewerDropDown {
    label: string;
    items: ComponentViewerDropDownItem[];
    onSelect(label: string): void;
}
