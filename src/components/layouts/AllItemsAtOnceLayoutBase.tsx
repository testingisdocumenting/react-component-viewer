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

export function AllItemsAtOnceLayoutBase (
    {
        selectedTitle,
        instancesWithDescription,
        onSelect,
        topLevelClassName,
        LayoutItemComponent
    }: LayoutProps & Props) {
    return (
        <div className={topLevelClassName}>
            {instancesWithDescription.data.map(withDescription =>
                <LayoutItemComponent
                    key={withDescription.title}
                    title={withDescription.title}
                    description={withDescription.description}
                    instance={withDescription.instance}
                    isSelected={selectedTitle === withDescription.title}
                    onSelect={onSelect}
                />
            )}
        </div>
    );
}
