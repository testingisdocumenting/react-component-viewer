import * as React from 'react';

import { SingleLayoutItemProps } from './AllItemsAtOnceLayoutBase';

export class DescriptionAndInstanceLayoutItem extends React.Component<SingleLayoutItemProps> {
    private instanceNode: HTMLDivElement;

    render() {
        const {
            title,
            component: Component,
            isSelected,
            onSelect
        } = this.props;

        const titleClassName = 'rcv-demo-layout-item-title' + (isSelected ? ' selected' : '');

        return (
            <div className="rcv-demo-layout-item" ref={this.saveNodeRef}>
                <div className={titleClassName} onClick={() => onSelect(title)}>
                    {title}
                </div>
                <div className="rcv-demo-layout-instance">
                    <Component/>
                </div>
            </div>
        );
    }

    saveNodeRef = (node: HTMLDivElement) => {
        this.instanceNode = node;
    }

    componentDidMount() {
        this.scrollIntoView();
    }

    scrollIntoView() {
        const {isSelected} = this.props;

        if (isSelected) {
            this.instanceNode.scrollIntoView({block: 'start'});
        }
    }
}
