export type EquipmentType = 'repeater' | 'base' | 'mobile' | 'handheld';

export interface MaintenanceItem {
  name: string;
  options?: string[];
  checked?: boolean;
}

export interface MaintenanceSection {
  category: string;
  items: MaintenanceItem[];
}

export interface AntennaOptions {
  type: string[];
  signalCable: string[];
  connectors: string[];
}