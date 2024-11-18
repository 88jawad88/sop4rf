import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Radio, Settings, List, Home, FileText, Menu, X } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Radio, label: 'Maintenance', path: '/maintenance' },
    { icon: List, label: 'Checklists', path: '/checklists' },
    { icon: FileText, label: 'Templates', path: '/templates' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-0 z-40 lg:relative
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        transition-transform duration-300 ease-in-out
      `}>
        <Sidebar menuItems={menuItems} onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto w-full lg:w-auto">
        <div className="container mx-auto px-4 sm:px-6 py-8 pt-20 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}