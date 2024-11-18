import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

type EquipmentType = 'repeater' | 'base' | 'mobile' | 'handheld';

interface MaintenanceItem {
  name: string;
  checked: boolean;
}

interface MaintenanceSection {
  category: string;
  items: MaintenanceItem[];
}

const maintenanceConfig: Record<EquipmentType, MaintenanceSection[]> = {
  repeater: [
    {
      category: 'Antenna',
      items: [
        { name: 'Antenna', checked: false },
        { name: 'Signal Cable', checked: false },
        { name: 'Connectors', checked: false },
        { name: 'Lightning Protection', checked: false },
        { name: 'Fixing Ropes + Clips + Brackets', checked: false },
      ],
    },
    {
      category: 'Power',
      items: [
        { name: 'Battery + Power Supply', checked: false },
        { name: 'Power Cable (AC + DC) + Sockets + Fuse', checked: false },
        { name: 'Circuit Breaker', checked: false },
        { name: '220 Charger', checked: false },
        { name: 'MPPT + MC4', checked: false },
      ],
    },
    {
      category: 'Equipment',
      items: [
        { name: 'Battery Drill', checked: false },
        { name: 'Safety Tools', checked: false },
        { name: 'Ohm Meter', checked: false },
        { name: 'SWR + Connector + Adapter', checked: false },
        { name: 'Gas Soldering + Caustic + Tin', checked: false },
        { name: 'Hex Key Screwdriver + Bolts', checked: false },
        { name: 'Screwdrivers Cross + Regular', checked: false },
        { name: 'Pliers + Cutters', checked: false },
      ],
    },
  ],
  mobile: [
    {
      category: 'Antenna',
      items: [
        { name: 'Antenna', checked: false },
        { name: 'Signal Cable', checked: false },
        { name: 'Connectors', checked: false },
        { name: 'GPS', checked: false },
      ],
    },
    {
      category: 'Mobile Station',
      items: [
        { name: 'Dashboard + External Mounting Bracket', checked: false },
        { name: 'Programming Cable + Laptop', checked: false },
        { name: 'KMC', checked: false },
      ],
    },
    {
      category: 'Power',
      items: [
        { name: 'DC Power Cable', checked: false },
        { name: 'Ignition Connector + Fuses', checked: false },
        { name: 'Converter from 24 to 12', checked: false },
        { name: 'Car Charger for Handy', checked: false },
        { name: 'Fuses', checked: false },
      ],
    },
  ],
  base: [
    {
      category: 'Antenna',
      items: [
        { name: 'Antenna', checked: false },
        { name: 'Signal Cable', checked: false },
        { name: 'Connectors', checked: false },
        { name: 'Lightning Protection', checked: false },
      ],
    },
    {
      category: 'Power',
      items: [
        { name: 'Power Supply', checked: false },
        { name: 'Power Cable + Fuse', checked: false },
        { name: 'Circuit Breaker', checked: false },
      ],
    },
    {
      category: 'Equipment',
      items: [
        { name: 'Programming Cable + Laptop', checked: false },
        { name: 'SWR Meter', checked: false },
        { name: 'Basic Tools Set', checked: false },
      ],
    },
  ],
  handheld: [
    {
      category: 'Handheld',
      items: [
        { name: 'Antenna', checked: false },
        { name: 'Battery', checked: false },
        { name: 'Clip', checked: false },
        { name: 'Laptop + Programming Cable', checked: false },
        { name: 'Handy Charger', checked: false },
        { name: 'Handheld Cover', checked: false },
        { name: 'Screwdrivers', checked: false },
      ],
    },
  ],
};

export function EquipmentForm() {
  const [equipmentType, setEquipmentType] = useState<EquipmentType>('repeater');
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceSection[]>(maintenanceConfig.repeater);

  useEffect(() => {
    setMaintenanceItems(maintenanceConfig[equipmentType]);
  }, [equipmentType]);

  const handleCheckboxChange = (sectionIndex: number, itemIndex: number) => {
    setMaintenanceItems(prevItems => {
      const newItems = [...prevItems];
      newItems[sectionIndex] = {
        ...newItems[sectionIndex],
        items: [...newItems[sectionIndex].items]
      };
      newItems[sectionIndex].items[itemIndex] = {
        ...newItems[sectionIndex].items[itemIndex],
        checked: !newItems[sectionIndex].items[itemIndex].checked
      };
      return newItems;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { equipmentType, maintenanceItems });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">Equipment Maintenance Form</h2>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Equipment Type
          </label>
          <select
            value={equipmentType}
            onChange={(e) => setEquipmentType(e.target.value as EquipmentType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="repeater">Repeater Station</option>
            <option value="base">Base Station</option>
            <option value="mobile">Mobile Unit</option>
            <option value="handheld">Handheld Device</option>
          </select>
        </div>

        <div className="space-y-8">
          {maintenanceItems.map((section, sectionIndex) => (
            <div key={section.category}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {section.category}
              </h3>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={item.name} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`${section.category}-${item.name}`}
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(sectionIndex, itemIndex)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`${section.category}-${item.name}`}
                      className="ml-3 block text-sm text-gray-700"
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save className="h-4 w-4" />
            Save Checklist
          </button>
        </div>
      </form>
    </div>
  );
}