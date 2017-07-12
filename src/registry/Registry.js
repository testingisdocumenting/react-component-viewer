import React from 'react';

import ComponentDemo from '../viewer/ComponentDemo';
import GridLayout from '../layouts/GridLayout';

class Registry {
    _componentsDemo = {};

    registerAsGrid(name, instancesWithDescription) {
        this._componentsDemo[name] = <ComponentDemo name={name}
                                                    layoutComponent={GridLayout}
                                                    instancesWithDescription={instancesWithDescription}/>;
    }

    findComponentsDemoByName(name) {
        return this._componentsDemo[name];
    }

    get names() {
        return Object.keys(this._componentsDemo);
    }
}

export default Registry;
