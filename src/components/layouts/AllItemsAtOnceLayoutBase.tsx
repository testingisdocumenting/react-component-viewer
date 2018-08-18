import { LayoutProps } from './LayoutProps';
import * as React from 'react';

export interface SingleLayoutItemProps {
    title: string;
    description?: string;
    instance: JSX.Element;
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
                    instance={demoInstance.instance}
                    isSelected={selectedTitle === demoInstance.title}
                    onSelect={onSelect}
                />
            )}
        </div>
    );
}
