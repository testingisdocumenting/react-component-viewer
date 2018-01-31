import { DescriptionAndInstance } from './DescriptionAndInstance';

export class InstancesWithDescription {
    data: DescriptionAndInstance[] = [];

    add(description: string, instance: JSX.Element) {
        if (this.data.filter(ni => ni.description === description).length) {
            throw new Error(`element with ${description} description already registered for `);
        }

        this.data.push({description, instance});
    }

    findByDescription(description: string) {
        const found = this.data.filter(ni => ni.description === description);

        if (found.length === 0) {
            throw new Error(`cannot find instance with '${description}' description`);
        }

        return found[0].instance;
    }
}