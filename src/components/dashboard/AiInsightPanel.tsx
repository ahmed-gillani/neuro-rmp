// src/components/dashboard/AiInsightPanel.tsx
import Card from '../common/Card';
import { Brain, TrendingUp, Lightbulb } from 'lucide-react';
import type { AiInsight } from '../../types/rpm';

interface Props {
  insight: AiInsight;
}

export default function AiInsightPanel({ insight }: Props) {
  return (
    <Card title="AI CLINICAL SUMMARY • TODAY" className="h-auto bg-gradient-to-br from-slate-50 to-white border-blue-100">
      <div className="space-y-5 text-sm">
        {/* Top Risks */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-violet-600" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Top Risks</p>
          </div>
          <ul className="text-slate-700 space-y-1 pl-5 list-disc text-[13px]">
            {insight.topRisks.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Clinical Trends */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Clinical Trends</p>
          </div>
          <ul className="text-slate-700 space-y-1 pl-5 list-disc text-[13px]">
            {insight.clinicalTrends.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Action Items */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Action Items</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-3.5 text-slate-700 text-[13px] space-y-1">
            {insight.recommendations.map((rec, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-amber-500">→</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}