import { DropDownItem } from './DropDownItem';
import { labelToKey } from './labelUtils';

export class DropDown {
    readonly label: string;
    readonly labelKey: string;
    readonly items: DropDownItem[];

    private _onSelect: (label: string) => void;
    private _isSelected?: () => boolean;

    constructor(label: string) {
        this.label = label;
        this.labelKey = labelToKey(label);
        this.items = [];
    }

    addItem(label: string, hotKey?: string) {
        this.items.push({
            label,
            labelKey: labelToKey(label),
            hotKey});
        return this;
    }

    onSelect(handler: (label: string) => void) {
        this._onSelect = handler;
        return this;
    }

    triggerSelectHandler(label: string) {
        this._onSelect(label);
    }

    findItemByLabelKey(labelKey: string) {
        return this.items.find(item => item.labelKey === labelKey);
    }
}