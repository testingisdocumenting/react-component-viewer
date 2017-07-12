import React, {Component} from 'react';
import ComponentWithDescription from './ComponentWithDescription';

class ComponentDemo extends Component {
    render() {
        const {layoutComponent, instancesWithDescription} = this.props;

        const Layout = layoutComponent;
        const children = Object.keys(instancesWithDescription).map(description => {
            return (
                <ComponentWithDescription description={description}
                                          componentInstance={instancesWithDescription[description]}/>
            )
        });

        return (
            <div>
                component demo:
                <Layout children={children}/>
            </div>
        )
    }
}

export default ComponentDemo;
