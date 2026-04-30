import React, { useState } from 'react';
import Card from '../components/common/Card';
import Toggle from '../components/common/Toggle';   // ← Yeh change karo (curly braces hatao)

const AdminControlPanel: React.FC = () => {
  const [modules, setModules] = useState({
    billing: true,
    communication: true,
    inventory: false,
    reports: true,
  });

  const [subscription] = useState({
    plan: "Professional",
    status: "Active",
    expiry: "2026-10-15",
    users: "12/20",
    storage: "8.4 GB / 50 GB"
  });

  const toggleModule = (key: string) => {
    setModules(prev => ({ 
      ...prev, 
      [key]: !prev[key as keyof typeof modules] 
    }));
  };

  return (
    <div className="space-y-6">
      {/* Subscription Status */}
      <Card title="Current Subscription">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div><strong>Plan:</strong> {subscription.plan}</div>
          <div><strong>Status:</strong> <span className="text-green-600 font-medium">{subscription.status}</span></div>
          <div><strong>Expiry:</strong> {subscription.expiry}</div>
          <div><strong>Users:</strong> {subscription.users}</div>
          <div className="md:col-span-2"><strong>Storage:</strong> {subscription.storage}</div>
        </div>
      </Card>

      {/* Module Toggles */}
      <Card title="Module Access Control">
        <div className="space-y-4">
          {Object.entries(modules).map(([key, enabled]) => (
            <div 
              key={key} 
              className="flex justify-between items-center py-3 border-b last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors"
            >
              <span className="capitalize font-medium text-gray-700">
                {key} Module
              </span>
              <Toggle 
                checked={enabled} 
                onChange={() => toggleModule(key)} 
              />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminControlPanel;