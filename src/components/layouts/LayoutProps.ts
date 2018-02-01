import { InstancesWithDescription } from '../registry/InstancesWithDescription';

export interface LayoutProps {
    selectedTitle: string;
    instancesWithDescription: InstancesWithDescription;
    onSelect: (name: string) => void;
}
