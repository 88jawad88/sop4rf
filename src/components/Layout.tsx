import React from 'react';
import { Outlet } from 'react-router-dom';
import { Radio, Settings, List, Home, FileText } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function Layout() {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Radio, label: 'Maintenance', path: '/maintenance' },
    { icon: List, label: 'Checklists', path: '/checklists' },
    { icon: FileText, label: 'Templates', path: '/templates' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}