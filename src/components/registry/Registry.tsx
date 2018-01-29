import * as React from 'react';

import ComponentDemo from '../viewer/ComponentDemo';
import GridLayout from '../layouts/GridLayout';

class Registry {
    _componentsDemo: {[name: string]: JSX.Element} = {};

    registerAsGrid(demoName: string, instancesWithDescription: {[name: string]: JSX.Element}) {
        this._componentsDemo[demoName] = (
            <ComponentDemo
                name={demoName}
                layoutComponent={GridLayout}
                instancesWithDescription={instancesWithDescription}
            />
        );
    }

    findComponentsDemoByName(name: string) {
        return this._componentsDemo[name];
    }

    get demoNames() {
        return Object.keys(this._componentsDemo);
    }
}

export default Registry;
