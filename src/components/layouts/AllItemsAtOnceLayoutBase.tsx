import { LayoutProps } from './LayoutProps';
import * as React from 'react';

export interface SingleLayoutItemProps {
    title: string;
    description?: string;
    instance: JSX.Element;
    isSelected: boolean;
    onSelect: (description: string) => void;
}

export interface Props {
    topLevelClassName: string;
    LayoutItemComponent: React.StatelessComponent<SingleLayoutItemProps>;
}

export function AllItemsAtOnceLayoutBase({
                                             selectedTitle,
                                             demoInstancesGroup,
                                             onSelect,
                                             topLevelClassName,
                                             LayoutItemComponent
                                         }: LayoutProps & Props) {
    return (
        <div className={topLevelClassName}>
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
