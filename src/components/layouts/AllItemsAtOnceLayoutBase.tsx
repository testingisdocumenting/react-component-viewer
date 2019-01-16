import { LayoutProps } from './LayoutProps';
import * as React from 'react';

export interface SingleLayoutItemProps {
    title: string;
    description?: string;
    component: React.ComponentType;
    isSelected: boolean;
    onSelect: (description: string) => void;
}

export interface Props extends LayoutProps {
    topLevelClassName: string;
    LayoutItemComponent: React.ComponentType<SingleLayoutItemProps>;
    style?: object;
}

export function AllItemsAtOnceLayoutBase({
                                             selectedTitle,
                                             demoInstancesGroup,
                                             onSelect,
                                             topLevelClassName,
                                             LayoutItemComponent,
                                             style = {}
                                         }: Props) {
    return (
        <div className={topLevelClassName} style={style}>
            {demoInstancesGroup.data.map(demoInstance =>
                <LayoutItemComponent
                    key={demoInstance.title}
                    title={demoInstance.title}
                    description={demoInstance.description}
                    component={demoInstance.component}
                    isSelected={selectedTitle === demoInstance.title}
                    onSelect={onSelect}
                />
            )}
        </div>
    );
}
