import React from 'react';
import { Layout } from './components/Layout';
import { MaintenanceForm } from './components/MaintenanceForm';
import { ChecklistForm } from './components/ChecklistForm';
import { Templates } from './components/Templates';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="maintenance" element={<MaintenanceForm />} />
        <Route path="checklists" element={<ChecklistForm />} />
        <Route path="templates" element={<Templates />} />
      </Route>
    </Routes>
  );
}

export default App;