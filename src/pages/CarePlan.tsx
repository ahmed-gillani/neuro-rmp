import { useState } from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

import { Plus,  Bot } from 'lucide-react';

export default function CarePlan() {
  const [activeTab, setActiveTab] = useState<'current' | 'goals' | 'history'>('current');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Care Plan Management</h1>
          <p className="text-gray-600">Personalized goals • Progress tracking • AI recommendations</p>
        </div>
        <Button variant='outline'>
          <Plus className="w-5 h-5 mr-2" />
          New Care Plan
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b">
        {['current', 'goals', 'history'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-4 font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'current' ? 'Current Plan' : tab}
          </button>
        ))}
      </div>

      {activeTab === 'current' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Care Plan */}
          <div className="lg:col-span-2">
            <Card title="Muhammad Ahmed - Current Care Plan">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
                  <div>
                    <p className="font-semibold">Blood Pressure Control</p>
                    <p className="text-sm text-gray-600">Target: &lt; 130/80 mmHg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">78%</p>
                    <p className="text-xs text-green-600">On Track</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl">
                  <div>
                    <p className="font-semibold">Daily Glucose Monitoring</p>
                    <p className="text-sm text-gray-600">Target: 80-130 mg/dL</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-amber-600">45%</p>
                    <p className="text-xs text-amber-600">Needs Attention</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Assistant */}
          <Card title="AI Care Assistant">
            <div className="h-80 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 rounded-2xl">
              <Bot className="w-16 h-16 text-primary-500 mb-4" />
              <p className="font-medium">Ask AI for recommendations</p>
              <p className="text-sm text-gray-500 mt-2">e.g. "Suggest interventions for high BP"</p>
              <Button className="mt-6">Open Chat Assistant</Button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'goals' && (
        <Card title="Active Goals & Interventions">
          <p className="text-gray-500 py-12 text-center">Goal tracking with progress indicators will go here.</p>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card title="Previous Care Plans">
          <p className="text-gray-500 py-12 text-center">Previous plans with diff view & AI gap analysis coming soon.</p>
        </Card>
      )}
    </div>
  );
}