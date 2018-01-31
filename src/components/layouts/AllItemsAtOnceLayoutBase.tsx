import { LayoutProps } from './LayoutProps';
import * as React from 'react';

export interface SingleLayoutItemProps {
    description: string;
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
        selectedDescription,
        instancesWithDescription,
        onSelect,
        topLevelClassName,
        LayoutItemComponent
    }: LayoutProps & Props) {
    return (
        <div className={topLevelClassName}>
            {instancesWithDescription.data.map(withDescription =>
                <LayoutItemComponent
                    key={withDescription.description}
                    description={withDescription.description}
                    instance={withDescription.instance}
                    isSelected={selectedDescription === withDescription.description}
                    onSelect={onSelect}
                />
            )}
        </div>
    );
}
