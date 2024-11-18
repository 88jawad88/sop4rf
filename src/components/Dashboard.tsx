import React, { useEffect, useState } from 'react';
import { Radio, Battery, Wifi, Radio as RadioIcon, CheckCircle, Clock } from 'lucide-react';
import { Template } from '../types';

export function Dashboard() {
  const [recentTemplates, setRecentTemplates] = useState<Template[]>([]);

  useEffect(() => {
    const savedTemplates = JSON.parse(localStorage.getItem('templates') || '[]');
    // Get the 5 most recent templates
    setRecentTemplates(savedTemplates.slice(-5).reverse());
  }, []);

  const stats = [
    {
      label: 'Repeater Stations',
      value: '12',
      icon: Wifi,
      color: 'text-blue-600',
    },
    {
      label: 'Base Stations',
      value: '24',
      icon: Radio,
      color: 'text-green-600',
    },
    {
      label: 'Mobile Units',
      value: '36',
      icon: Battery,
      color: 'text-purple-600',
    },
    {
      label: 'Handheld Devices',
      value: '48',
      icon: RadioIcon,
      color: 'text-orange-600',
    },
  ];

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-8">
        Equipment Overview
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow-sm p-4 sm:p-6 flex items-center"
            >
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10 mr-4`}>
                <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activities
        </h2>
        <div className="space-y-4">
          {recentTemplates.map((template) => (
            <div
              key={template.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 gap-3"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-full">
                  {template.type === 'Maintenance' ? (
                    <Clock className="h-5 w-5 text-blue-600" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {template.type} - {template.equipmentType}
                  </p>
                  <p className="text-sm text-gray-500">
                    Created: {template.date}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 text-sm rounded-full text-center ${
                template.type === 'Maintenance' 
                  ? 'text-blue-700 bg-blue-50' 
                  : 'text-green-700 bg-green-50'
              }`}>
                {template.type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}