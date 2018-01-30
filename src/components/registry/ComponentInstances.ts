import { DescriptionAndInstance } from './DescriptionAndInstance';

export class ComponentInstances {
    name: string;
    layoutInstance: JSX.Element;
    namedInstances: DescriptionAndInstance[] = [];

    constructor(name: string, layoutInstance: JSX.Element) {
        this.name = name;
        this.layoutInstance = layoutInstance;
    }

    add(name: string, instance: JSX.Element) {
        if (this.namedInstances.filter(ni => ni.DescriptionAndInstance === name).length) {
            throw new Error(`element with ${name} name already registered for `);
        }

        this.namedInstances.push({DescriptionAndInstance: name, instance});
    }
}