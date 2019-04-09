import { DropDown } from './DropDown';

export class DropDowns {
    list: DropDown[];

    constructor() {
        this.list = [];
    }

    add(label: string) {
        const dropDown = new DropDown(label);
        this.list.push(dropDown);

        return dropDown;
    }

    isEmpty() {
        return this.list.length === 0;
    }

    findDropDownByLabel(label: string) {
        return this.list.find(dropDown => dropDown.label === label);
    }

    findDropDownByLabelKey(labelKey: string) {
        return this.list.find(dropDown => dropDown.labelKey === labelKey);
    }
}