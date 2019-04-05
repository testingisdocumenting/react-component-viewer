import * as React from 'react';

export interface Props {
    initialUrl: string;
    urlRegexp: RegExp;
    component: React.ComponentType;
}

export class NavigateToUrlWrapper extends React.Component<Props> {
    render() {
        const {component: Component} = this.props;
        return (
            <Component/>
        );
    }

    componentDidMount() {
        const {initialUrl, urlRegexp} = this.props;

        if (urlRegexp.test(document.location.pathname +  document.location.search)) {
            return;
        }

        document.location.href = initialUrl;
    }
}