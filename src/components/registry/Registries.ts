import { Registry } from '../';

export class Registries {
    public registries: Registry[];
    private _names: string[];

    constructor(registries: Registry[]) {
        this.registries = registries;
        this._names = registries.map(r => r.name);
    }

    get first() {
        return this.registries[0];
    }

    get names() {
        return this._names;
    }

    registryByName(name: string): Registry {
        const found = this.registries.filter(r => r.name === name);

        if (found.length === 0) {
            throw new Error(`cannot find registry with ${name} name`);
        }

        return found.length ? found[0] : this.registries[0];
    }
}