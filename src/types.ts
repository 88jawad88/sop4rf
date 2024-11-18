export type EquipmentType = 'repeater' | 'base' | 'mobile' | 'handheld';

export interface MaintenanceItem {
  name: string;
  options?: string[];
  checked?: boolean;
  value?: string;
}

export interface MaintenanceSection {
  category: string;
  items: MaintenanceItem[];
}

export interface Template {
  id: string;
  date: string;
  type: 'Maintenance' | 'Checklist';
  equipmentType: EquipmentType;
  items: {
    category: string;
    items: Array<{
      name: string;
      value?: string;
      checked?: boolean;
    }>;
  }[];
}