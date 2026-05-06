import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
  { date: 'Apr 25', bp: 132, glucose: 145 },
  { date: 'Apr 26', bp: 138, glucose: 152 },
  { date: 'Apr 27', bp: 145, glucose: 168 },
  { date: 'Apr 28', bp: 148, glucose: 195 },
  { date: 'Apr 29', bp: 142, glucose: 175 },
];

export default function ReadingChart() {
  return (
    <div className="chart-container w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6eef7" />
          <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#475569' }} />
          <YAxis stroke="#64748b" tick={{ fill: '#475569' }} />
          <Tooltip wrapperStyle={{ borderRadius: 8 }} />
          <Line
            type="monotone"
            dataKey="bp"
            stroke="#ef4444"
            strokeWidth={3}
            dot={false}
            name="Blood Pressure (Systolic)"
          />
          <Line
            type="monotone"
            dataKey="glucose"
            stroke="#1e90ff"
            strokeWidth={3}
            dot={false}
            name="Glucose (mg/dL)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
