import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';

interface Template {
  id: string;
  date: string;
  type: string;
  equipmentType: string;
  items: {
    category: string;
    items: Array<{
      name: string;
      value?: string;
      checked?: boolean;
    }>;
  }[];
}

export function Templates() {
  const printRef = useRef<HTMLDivElement>(null);
  
  // This would normally come from a database or state management
  const templates: Template[] = [
    {
      id: '1',
      date: '2024-03-15',
      type: 'Maintenance',
      equipmentType: 'Repeater Station',
      items: [
        {
          category: 'Antenna',
          items: [
            { name: 'Signal Cable', value: 'CNT400' },
            { name: 'Connectors', value: 'PL Connector' },
            { name: 'Lightning Protection', checked: true },
          ],
        },
      ],
    },
    // Add more templates as needed
  ];

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Saved Templates</h1>
      </div>

      <div className="space-y-6" ref={printRef}>
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {template.type} - {template.equipmentType}
                </h2>
                <p className="text-sm text-gray-500">Created: {template.date}</p>
              </div>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-md"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
            </div>

            <div className="space-y-6">
              {template.items.map((section) => (
                <div key={section.category}>
                  <h3 className="font-medium text-gray-900 mb-3">
                    {section.category}
                  </h3>
                  <div className="space-y-2">
                    {section.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-center justify-between py-2 border-b border-gray-100"
                      >
                        <span className="text-sm text-gray-700">{item.name}</span>
                        <span className="text-sm text-gray-900">
                          {item.value || (item.checked ? '✓' : '✗')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}