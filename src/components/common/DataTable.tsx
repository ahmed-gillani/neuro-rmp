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
      <div className="sm:hidden space-y-2">
        {table.getRowModel().rows.map((row) => (
          <div key={row.id} className="bg-white border rounded-lg p-3 shadow-sm">
            <div className="space-y-1.5">
              {headerGroups[0]?.headers.map((header) => {
                const cell = row.getVisibleCells().find(c => c.column.id === header.column.id);
                if (!cell) return null;
                return (
                  <div key={cell.id} className="flex justify-between items-start">
                    <div className="text-[11px] text-gray-500 pr-3 w-1/2">{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    <div className="text-xs text-black font-medium w-1/2">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop / Tablet */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-xs table-auto">
          <thead className="bg-gray-50 border-b">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-3 py-2 text-left font-semibold text-gray-600 uppercase tracking-wide">
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
                  <td key={cell.id} className="px-3 py-2 text-xs text-black align-top">
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