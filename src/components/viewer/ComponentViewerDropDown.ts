import { ToolbarDropDownItem } from './toolbar/ToolbarDropDownItem';

export interface ComponentViewerDropDown {
    label: string;
    items: ToolbarDropDownItem[];
    onSelect(label: string): void;
}
