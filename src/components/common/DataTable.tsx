// src/components/common/DataTable.tsx
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from '@tanstack/react-table';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export default function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerGroups = table.getHeaderGroups();

  return (
    <div className="w-full">
      {/* Mobile: card/list view */}
      <div className="sm:hidden space-y-3">
        {table.getRowModel().rows.map((row) => (
          <div key={row.id} className="bg-white border rounded-xl p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="space-y-2 w-full">
                {headerGroups[0]?.headers.map((header) => {
                  const cell = row.getVisibleCells().find(c => c.column.id === header.column.id);
                  if (!cell) return null;
                  return (
                    <div key={cell.id} className="flex justify-between items-start">
                      <div className="text-[12px] text-gray-500 pr-4 w-1/2">{flexRender(header.column.columnDef.header, header.getContext())}</div>
                      <div className="text-sm text-black font-medium w-1/2">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop / Tablet: regular table with horizontal scroll */}
      <div className="hidden sm:block overflow-x-auto rounded-2xl border border-gray-200">
        <table className="w-full text-sm table-auto">
          <thead className="bg-gray-50 border-b">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-3 sm:px-5 py-2 sm:py-3.5 text-left font-medium text-black text-xs uppercase tracking-normal sm:tracking-wider">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-3 sm:px-5 py-2 sm:py-4 text-sm text-black align-top">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}