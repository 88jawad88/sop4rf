import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Radio } from 'lucide-react';

interface MenuItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

export function Sidebar({ menuItems }: SidebarProps) {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
        <Radio className="h-6 w-6 text-blue-600" />
        <span className="text-xl font-semibold">RF Manager</span>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                isActive ? 'bg-blue-50 text-blue-600' : ''
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}