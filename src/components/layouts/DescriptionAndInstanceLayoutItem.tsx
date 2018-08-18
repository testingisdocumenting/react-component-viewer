import * as React from 'react';

import { SingleLayoutItemProps } from './AllItemsAtOnceLayoutBase';

export class DescriptionAndInstanceLayoutItem extends React.Component<SingleLayoutItemProps> {
    private instanceNode: HTMLDivElement;

    render() {
        const {
            title,
            instance,
            isSelected,
            onSelect
        } = this.props;

        const titleClassName = 'rcw-demo-layout-item-title' + (isSelected ? ' selected' : '');

        return (
            <div className="rcw-demo-layout-item" ref={this.saveNodeRef}>
                <div className={titleClassName} onClick={() => onSelect(title)}>
                    {title}
                </div>
                <div className="rcw-demo-layout-instance">
                    {instance}
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
