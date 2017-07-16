import React, {Component} from 'react';
import ComponentWithDescription from './ComponentWithDescription';

import Header from '../registry/Header';

class ComponentDemo extends Component {
    render() {
        const {layoutComponent, instancesWithDescription} = this.props;

        const Layout = layoutComponent;
        const layoutItems = Object.keys(instancesWithDescription).map(description =>
            createComponent(description, instancesWithDescription[description]));

        return (
            <div>
                <Layout>
                    {layoutItems}
                </Layout>
            </div>
        )
    }
}

function createComponent(description, componentInstance) {
    if (componentInstance.type === Header) {
        return React.cloneElement(componentInstance, {key: description, label: description});
    }

    return <ComponentWithDescription key={description}
                                     description={description}
                                     componentInstance={componentInstance}/>

}

export default ComponentDemo;
