// src/components/common/Table.tsx
import React from 'react';

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200 responsive-table">
      <table className="w-full text-sm table-auto">
        <thead>
          <tr className="bg-gray-50 border-b">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-3 py-2 sm:px-5 sm:py-4 text-left text-xs sm:text-xs font-bold uppercase tracking-widest text-black whitespace-normal"
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