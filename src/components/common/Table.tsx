// src/components/common/Table.tsx
import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-xs table-auto">
        <thead>
          <tr className="bg-gray-50 border-b">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-3 py-2 text-left text-[12px] font-bold uppercase tracking-wider text-gray-600 whitespace-normal"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;