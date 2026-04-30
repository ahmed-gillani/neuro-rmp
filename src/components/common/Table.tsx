//src/components/common/Table.tsx
import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <div className="w-full overflow-x-auto rounded-[var(--radius-card)] border border-[rgb(var(--border))] shadow-sm">
      <table className="w-full text-left border-collapse bg-white">
        <thead>
          <tr className="bg-[rgb(var(--muted))] border-b border-[rgb(var(--border))]">
            {headers.map((header, index) => (
              <th 
                key={index} 
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[rgb(var(--muted-foreground))]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[rgb(var(--border))]">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;