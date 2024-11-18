import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { MaintenanceSection, EquipmentType, AntennaOptions } from '../types';

const maintenanceConfig: Record<EquipmentType, MaintenanceSection[]> = {
  repeater: [
    {
      category: 'Antenna',
      items: [
        { name: 'Signal Cable', options: ['CNT400', '8D-FB', 'RG213', 'RG58'] },
        { name: 'Connectors', options: ['PL Connector', 'N Connector'] },
        { name: 'Lightning Protection' },
        { name: 'Fixing Ropes + Clips + Brackets + Bolts' },
      ],
    },
    {
      category: 'The Repeater',
      items: [
        { name: 'Pepwave' },
        { name: 'Laptop + Programming Cable + Network Cable' },
      ],
    },
    {
      category: 'Power',
      items: [
        { name: 'DC Power Cable + Sockets + Fuse' },
        { name: 'Circuit Breaker' },
        { name: 'Battery' },
        { name: 'AC Cable' },
        { name: 'Power Supply + Charger 220' },
        { name: 'MC4' },
      ],
    },
  ],
  base: [
    {
      category: 'Antenna',
      items: [
        { name: 'Signal Cable', options: ['CNT400', '8D-FB', 'RG213', 'RG58'] },
        { name: 'Connectors', options: ['PL Connector', 'N Connector'] },
      ],
    },
    {
      category: 'Base Station',
      items: [
        { name: 'KMC' },
        { name: 'Laptop + Programming Cable' },
      ],
    },
    {
      category: 'Power',
      items: [
        { name: 'Power Cable + Sockets + Fuse' },
        { name: '220 Charger' },
      ],
    },
    {
      category: 'Equipment',
      items: [
        { name: 'Battery Drill' },
        { name: 'Meter' },
        { name: 'Hex Key Screwdriver + Bolts' },
        { name: 'Screwdrivers Cross + Regular' },
        { name: 'Pliers + Cutters' },
      ],
    },
  ],
  mobile: [
    {
      category: 'Antenna',
      items: [
        { name: 'Signal Cable', options: ['CNT400', '8D-FB', 'RG213', 'RG58'] },
        { name: 'Connectors', options: ['PL Connector', 'N Connector'] },
        { name: 'GPS' },
      ],
    },
    {
      category: 'Mobile Station',
      items: [
        { name: 'Programming Cable + Laptop' },
        { name: 'KMC' },
      ],
    },
    {
      category: 'Power',
      items: [
        { name: 'DC Power Cable' },
        { name: 'Ignition Connector + Fuses' },
        { name: 'Converter from 24 to 12' },
        { name: 'Fuses' },
      ],
    },
  ],
  handheld: [
    {
      category: 'Handheld',
      items: [
        { name: 'Antenna/Type', options: ['Hustler', 'Procon', 'BC100', 'BC101'] },
        { name: 'Battery' },
        { name: 'Clip' },
        { name: 'Laptop + Programming Cable' },
        { name: 'Handheld Charger' },
        { name: 'Handheld Cover' },
        { name: 'Screwdrivers' },
      ],
    },
  ],
};

export function ChecklistForm() {
  const [equipmentType, setEquipmentType] = useState<EquipmentType>('repeater');
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceSection[]>(maintenanceConfig.repeater);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  useEffect(() => {
    setMaintenanceItems(maintenanceConfig[equipmentType]);
    setSelectedOptions({});
  }, [equipmentType]);

  const handleOptionChange = (itemName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [itemName]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Checklist submitted:', { equipmentType, maintenanceItems, selectedOptions });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6">Periodic Inspection Checklist</h2>
        
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
          {maintenanceItems.map((section) => (
            <div key={section.category}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {section.category}
              </h3>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <span className="text-sm text-gray-700">{item.name}</span>
                    {item.options ? (
                      <select
                        value={selectedOptions[item.name] || ''}
                        onChange={(e) => handleOptionChange(item.name, e.target.value)}
                        className="ml-4 px-2 py-1 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="">Select {item.name}</option>
                        {item.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    )}
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