interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export default function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            {headers.map((header, i) => (
              <th key={i} className="px-6 py-4 font-medium text-gray-600">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {children}
        </tbody>
      </table>
    </div>
  );
}