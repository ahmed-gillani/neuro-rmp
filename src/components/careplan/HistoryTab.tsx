import Card from '../common/Card';
import Badge from '../common/Badge';

const history = [
  { date: '2026-03-01', note: 'Initial care plan created', status: 'Completed' },
  { date: '2026-04-01', note: 'BP improved after medication adjustment', status: 'Completed' },
];

export default function HistoryTab() {
  return (
    <Card title="Previous Care Plans">
      <div className="space-y-4">
        {history.map((entry, idx) => (
          <div key={idx} className="border border-gray-200 rounded-2xl p-6">
            <p className="font-medium">{entry.date}</p>
            <p className="text-gray-600 mt-2">{entry.note}</p>
            <Badge status={entry.status as any} className="mt-3" />
          </div>
        ))}
      </div>
    </Card>
  );
}