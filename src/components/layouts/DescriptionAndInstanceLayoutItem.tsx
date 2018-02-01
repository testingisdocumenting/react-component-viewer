import { SingleLayoutItemProps } from './AllItemsAtOnceLayoutBase';
import * as React from 'react';

export function DescriptionAndInstanceLayoutItem(itemClassName: string):
    React.StatelessComponent<SingleLayoutItemProps> {

    return function LayoutItem({title, description, instance, isSelected, onSelect}: SingleLayoutItemProps) {
        const titleClassName = 'title' + (isSelected ? ' selected' : '');

        return (
            <div className={itemClassName}>
                <div className={titleClassName} onClick={() => onSelect(title)}>
                    {title}
                </div>
                <div className="instance">
                    {instance}
                </div>
            </div>
        );
    };
}
