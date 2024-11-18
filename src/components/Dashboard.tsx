import React from 'react';
import { Radio, Battery, Wifi, Radio as RadioIcon } from 'lucide-react';

export function Dashboard() {
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
      <h1 className="text-2xl font-semibold text-gray-900 mb-8">
        Equipment Overview
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg shadow-sm p-6 flex items-center"
            >
              <div className={`p-3 rounded-full ${stat.color} bg-opacity-10 mr-4`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Maintenance Checks
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-50 rounded-full">
                  <Radio className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    Repeater Station #{i}
                  </p>
                  <p className="text-sm text-gray-500">
                    Last checked: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 text-sm text-green-700 bg-green-50 rounded-full">
                Completed
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}