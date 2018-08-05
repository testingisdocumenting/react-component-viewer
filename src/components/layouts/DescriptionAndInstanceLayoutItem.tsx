import * as React from 'react';

import { SingleLayoutItemProps } from './AllItemsAtOnceLayoutBase';

export function DescriptionAndInstanceLayoutItem({
                                                     title,
                                                     description,
                                                     instance,
                                                     isSelected,
                                                     onSelect
                                                 }: SingleLayoutItemProps) {
    const titleClassName = 'rcw-demo-layout-item-title' + (isSelected ? ' selected' : '');

    return (
        <div className="rcw-demo-layout-item">
            <div className={titleClassName} onClick={() => onSelect(title)}>
                {title}
            </div>
            <div className="rcw-demo-layout-instance">
                {instance}
            </div>
        </div>
    );
}
