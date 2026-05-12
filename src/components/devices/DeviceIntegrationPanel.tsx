// src/components/devices/DeviceIntegrationPanel.tsx
// RPM-010: Vendor integration status dashboard

import { useState } from 'react';
import Card from '../common/Card';
import { CheckCircle, XCircle, AlertTriangle, Wifi, Settings, RefreshCw, ExternalLink } from 'lucide-react';
import { useDevicesStore } from '../../stores/useDevicesStore';
import type { VendorIntegration } from '../../types/devices';

interface Props {
  integrations: VendorIntegration[];
}

const VENDOR_DOCS: Record<string, string> = {
  Tenovi: 'https://developer.tenovi.com',
  Withings: 'https://developer.withings.com',
  iHealth: 'https://developer.ihealth.com',
  Omron: 'https://developer.omron.com',
};

export default function DeviceIntegrationPanel({ integrations }: Props) {
  const { updateVendorIntegration } = useDevicesStore();
  const [editing, setEditing] = useState<string | null>(null);
  const [webhookDraft, setWebhookDraft] = useState('');

  const statusIcon = (status: VendorIntegration['syncStatus']) => ({
    OK: <CheckCircle size={16} className="text-emerald-500" />,
    Error: <XCircle size={16} className="text-rose-500" />,
    'Not Configured': <AlertTriangle size={16} className="text-slate-400" />,
  }[status]);

  const statusBg = (status: VendorIntegration['syncStatus']) => ({
    OK: 'border-emerald-100 bg-emerald-50/40',
    Error: 'border-rose-100 bg-rose-50/40',
    'Not Configured': 'border-slate-100 bg-slate-50/40',
  }[status]);

  return (
    <div className="space-y-4">
      {/* Explainer */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 flex items-start gap-3">
        <Wifi size={16} className="text-blue-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-[12px] font-semibold text-blue-800">RPM-010 — Vendor Integration</p>
          <p className="text-[11px] text-blue-600 mt-0.5 leading-relaxed">
            Configure webhook URLs and API credentials for each vendor. When a patient's device submits a reading, the vendor POSTs to your webhook, which your backend ingests and forwards to the store. API keys are configured server-side and never exposed in the UI.
          </p>
        </div>
      </div>

      {/* Integration cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {integrations.map((vi) => (
          <Card key={vi.vendor} className={`shadow-none p-4 border ${statusBg(vi.syncStatus)}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {statusIcon(vi.syncStatus)}
                <h4 className="text-[13px] font-semibold text-slate-800">{vi.vendor}</h4>
              </div>
              <div className="flex items-center gap-2">
                {/* Toggle */}
                <button
                  onClick={() => updateVendorIntegration(vi.vendor, { isEnabled: !vi.isEnabled })}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${vi.isEnabled ? 'bg-blue-600' : 'bg-slate-200'}`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-sm transition-transform ${vi.isEnabled ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                </button>
                <a
                  href={VENDOR_DOCS[vi.vendor]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>

            {/* Status row */}
            <div className="flex flex-wrap gap-3 mb-3 text-[10px]">
              <span className={`font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                vi.syncStatus === 'OK' ? 'text-emerald-700 bg-emerald-50 border-emerald-200' :
                vi.syncStatus === 'Error' ? 'text-rose-700 bg-rose-50 border-rose-200' :
                'text-slate-500 bg-slate-50 border-slate-200'
              }`}>{vi.syncStatus}</span>
              <span className={`font-medium ${vi.apiKeyConfigured ? 'text-emerald-600' : 'text-slate-400'}`}>
                {vi.apiKeyConfigured ? '✓ API Key Set' : '✗ No API Key'}
              </span>
              {vi.lastSyncAt && (
                <span className="text-slate-400">
                  Synced {new Date(vi.lastSyncAt).toLocaleString()}
                </span>
              )}
            </div>

            {/* Webhook URL */}
            {editing === vi.vendor ? (
              <div className="flex gap-2 mt-2">
                <input
                  type="url"
                  value={webhookDraft}
                  onChange={(e) => setWebhookDraft(e.target.value)}
                  placeholder="https://api.yourapp.com/webhooks/..."
                  className="flex-1 text-[11px] px-2 py-1.5 border border-slate-200 rounded-lg outline-none focus:border-blue-400"
                />
                <button
                  onClick={() => {
                    updateVendorIntegration(vi.vendor, { webhookUrl: webhookDraft });
                    setEditing(null);
                  }}
                  className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 px-2"
                >
                  Save
                </button>
                <button onClick={() => setEditing(null)} className="text-[10px] text-slate-400 hover:text-slate-600 px-1">
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between mt-2">
                <p className="text-[10px] font-mono text-slate-400 truncate max-w-[70%]">
                  {vi.webhookUrl ?? 'No webhook configured'}
                </p>
                <button
                  onClick={() => { setEditing(vi.vendor); setWebhookDraft(vi.webhookUrl ?? ''); }}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <Settings size={12} />
                </button>
              </div>
            )}

            {/* Error message */}
            {vi.syncStatus === 'Error' && vi.errorMessage && (
              <div className="mt-3 rounded-lg bg-rose-50 border border-rose-100 px-3 py-2">
                <p className="text-[10px] text-rose-600 font-medium">{vi.errorMessage}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Backend note */}
      <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4">
        <p className="text-[10px] uppercase tracking-widest text-amber-600 font-semibold mb-1">Backend Integration Note</p>
        <p className="text-[11px] text-amber-700 leading-relaxed">
          Webhook URLs are display-only in mock mode. In production, your backend validates incoming payloads using the vendor's signing secret, parses readings, and emits a <code className="font-mono bg-amber-100 px-1 rounded">deviceConnectionEvent</code> — which the store's <code className="font-mono bg-amber-100 px-1 rounded">logConnectionEvent()</code> action ingests via WebSocket or polling. No frontend changes are needed when switching from mock to live.
        </p>
      </div>
    </div>
  );
}