import { Registry } from '../';
import { RegistryConfig } from './Registry';

export class Registries {
    private readonly _names: string[];
    private readonly _config: RegistryConfig;

    public readonly registries: Registry[];

    constructor(config?: RegistryConfig) {
        this._config = config || {};
        this.registries = [];
        this._names = [];
    }

    add(name: string, config?: RegistryConfig) {
        const registry = new Registry(name, {...this._config, ...config});
        this.registries.push(registry);
        this._names.push(name);

        return registry;
    }

    get first() {
        return this.registries[0];
    }

    get names() {
        return this._names;
    }

    registryByName(name: string) {
        const found = this.registries.filter(r => r.name === name);
        return found.length ? found[0] : null;
    }
}