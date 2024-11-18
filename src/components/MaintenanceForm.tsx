import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MaintenanceSection, EquipmentType, Template } from '../types';

const maintenanceConfig: Record<EquipmentType, MaintenanceSection[]> = {
  repeater: [
    {
      category: 'Antenna',
      items: [
        { name: 'Antenna', options: ['Hustler', 'Procon', 'BC100', 'BC101'] },
        { name: 'Signal Cable', options: ['CNT400', '8D-FB', 'RG213', 'RG58'] },
        { name: 'Connectors', options: ['PL Connector', 'N Connector'] },
        { name: 'Lightning Protection' },
        { name: 'Fixing Ropes + Clips + Brackets' },
      ],
    },
    {
      category: 'Power',
      items: [
        { name: 'Battery + Power Supply' },
        { name: 'Power Cable (AC + DC) + Sockets + Fuse' },
        { name: 'Circuit Breaker' },
        { name: '220 Charger' },
        { name: 'MPPT + MC4' },
      ],
    },
    {
      category: 'Equipment',
      items: [
        { name: 'Battery Drill' },
        { name: 'Safety Tools' },
        { name: 'Ohm Meter' },
        { name: 'SWR + Connector + Adapter' },
        { name: 'Gas Soldering + Caustic + Tin' },
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
        { name: 'Antenna', options: ['Hustler', 'Procon', 'BC100', 'BC101'] },
        { name: 'Signal Cable', options: ['CNT400', '8D-FB', 'RG213', 'RG58'] },
        { name: 'Connectors', options: ['PL Connector', 'N Connector'] },
        { name: 'GPS' },
      ],
    },
    {
      category: 'Mobile Station',
      items: [
        { name: 'Dashboard + External Mounting Bracket' },
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
        { name: 'Car Charger for Handy' },
        { name: 'Fuses' },
      ],
    },
  ],
  base: [
    {
      category: 'Antenna',
      items: [
        { name: 'Antenna', options: ['Hustler', 'Procon', 'BC100', 'BC101'] },
        { name: 'Signal Cable', options: ['CNT400', '8D-FB', 'RG213', 'RG58'] },
        { name: 'Connectors', options: ['PL Connector', 'N Connector'] },
        { name: 'Lightning Protection' },
      ],
    },
    {
      category: 'Power',
      items: [
        { name: 'Power Supply' },
        { name: 'Power Cable + Fuse' },
        { name: 'Circuit Breaker' },
      ],
    },
    {
      category: 'Equipment',
      items: [
        { name: 'Programming Cable + Laptop' },
        { name: 'SWR Meter' },
        { name: 'Basic Tools Set' },
      ],
    },
  ],
  handheld: [
    {
      category: 'Handheld',
      items: [
        { name: 'Antenna', options: ['Hustler', 'Procon', 'BC100', 'BC101'] },
        { name: 'Battery' },
        { name: 'Clip' },
        { name: 'Laptop + Programming Cable' },
        { name: 'Handy Charger' },
        { name: 'Handheld Cover' },
        { name: 'Screwdrivers' },
      ],
    },
  ],
};

export function MaintenanceForm() {
  const navigate = useNavigate();
  const [equipmentType, setEquipmentType] = useState<EquipmentType>('repeater');
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceSection[]>(maintenanceConfig.repeater);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMaintenanceItems(maintenanceConfig[equipmentType]);
    setSelectedOptions({});
    setCheckedItems({});
  }, [equipmentType]);

  const handleOptionChange = (itemName: string, value: string) => {
    setSelectedOptions(prev => ({
      ...prev,
      [itemName]: value
    }));
  };

  const handleCheckboxChange = (itemName: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const templateData: Template = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: 'Maintenance',
      equipmentType,
      items: maintenanceItems.map(section => ({
        category: section.category,
        items: section.items.map(item => ({
          name: item.name,
          value: selectedOptions[item.name],
          checked: checkedItems[item.name]
        }))
      }))
    };
    
    const existingTemplates = JSON.parse(localStorage.getItem('templates') || '[]');
    localStorage.setItem('templates', JSON.stringify([...existingTemplates, templateData]));
    
    navigate('/templates');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Maintenance Form</h2>
        
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
                  <div key={item.name} className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-2 gap-2">
                    <span className="text-sm text-gray-700">{item.name}</span>
                    {item.options ? (
                      <select
                        value={selectedOptions[item.name] || ''}
                        onChange={(e) => handleOptionChange(item.name, e.target.value)}
                        className="w-full sm:w-auto px-2 py-1 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="">Select {item.name}</option>
                        {item.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className="flex justify-end">
                        <input
                          type="checkbox"
                          checked={checkedItems[item.name] || false}
                          onChange={() => handleCheckboxChange(item.name)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
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
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Save className="h-4 w-4" />
            Save Template
          </button>
        </div>
      </form>
    </div>
  );
}