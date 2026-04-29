import Card from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  color?: string;
}

export default function StatCard({ title, value, change}: StatCardProps) {
  const isPositive = change && change > 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-4xl font-bold text-gray-900 mt-2">{value}</p>
      
      {change !== undefined && (
        <p className={`text-sm mt-2 flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(change)}% from last month
        </p>
      )}
    </Card>
  );
}