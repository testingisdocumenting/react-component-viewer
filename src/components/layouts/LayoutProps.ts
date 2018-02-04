import { DemoInstancesGroup } from '../registry/DemoInstancesGroup';

export interface LayoutProps {
    selectedTitle: string;
    demoInstancesGroup: DemoInstancesGroup;
    onSelect: (name: string) => void;
}
