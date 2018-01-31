import { SingleLayoutItemProps } from './AllItemsAtOnceLayoutBase';
import * as React from 'react';

export function DescriptionAndInstanceLayoutItem(itemClassName: string):
    React.StatelessComponent<SingleLayoutItemProps> {

    return function LayoutItem({description, instance, isSelected, onSelect}: SingleLayoutItemProps) {
        const descriptionClassName = 'description' + (isSelected ? ' selected' : '');

        return (
            <div className={itemClassName}>
                <div className={descriptionClassName} onClick={() => onSelect(description)}>
                    {description}
                </div>
                <div className="instance">
                    {instance}
                </div>
            </div>
        );
    };
}
