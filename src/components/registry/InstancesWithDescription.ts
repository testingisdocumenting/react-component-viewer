import { DescriptionAndInstance } from './DescriptionAndInstance';

export class InstancesWithDescription {
    data: DescriptionAndInstance[] = [];

    add(title: string, description: string, instance: JSX.Element) {
        if (this.data.filter(ni => ni.title === title).length) {
            throw new Error(`element with ${title} title is already registered for `);
        }

        this.data.push({title, description, instance});
    }

    findByTitle(title: string) {
        const found = this.data.filter(ni => ni.title === title);

        if (found.length === 0) {
            throw new Error(`cannot find instance with '${title}' title`);
        }

        return found[0].instance;
    }
}