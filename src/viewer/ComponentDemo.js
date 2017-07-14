import React, {Component} from 'react';
import ComponentWithDescription from './ComponentWithDescription';

import Header from '../registry/Header';

class ComponentDemo extends Component {
    render() {
        const {layoutComponent, instancesWithDescription} = this.props;

        const Layout = layoutComponent;
        const children = Object.keys(instancesWithDescription).map(description =>
            createComponent(description, instancesWithDescription[description]));

        return (
            <div>
                <Layout children={children}/>
            </div>
        )
    }
}

function createComponent(description, componentInstance) {
    if (componentInstance instanceof Header) {
        return componentInstance;
    }

    return <ComponentWithDescription key={description}
                                     description={description}
                                     componentInstance={componentInstance}/>

}

export default ComponentDemo;
