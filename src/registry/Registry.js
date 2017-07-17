import React from 'react';

import ComponentDemo from '../viewer/ComponentDemo';
import GridLayout from '../layouts/GridLayout';

class Registry {
    _componentsDemo = {};

    registerAsGrid(demoName, instancesWithDescription) {
        this._componentsDemo[demoName] = (
            <ComponentDemo name={demoName}
                           layoutComponent={GridLayout}
                           instancesWithDescription={instancesWithDescription}/>
        );
    }

    findComponentsDemoByName(name) {
        return this._componentsDemo[name];
    }

    get demoNames() {
        return Object.keys(this._componentsDemo);
    }
}

export default Registry;
