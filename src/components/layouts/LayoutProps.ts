import { InstancesWithDescription } from '../registry/InstancesWithDescription';

export interface LayoutProps {
    selectedDescription: string;
    instancesWithDescription: InstancesWithDescription;
    onSelect: (name: string) => void;
}
