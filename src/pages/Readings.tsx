import { useState, useMemo } from 'react';
import { mockReadings, mockPatients } from '../data/mockData';
import type { Reading } from '../types';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender
} from '@tanstack/react-table';
import type { ColumnDef, SortingState } from '@tanstack/react-table';

import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ReadingChart from '../components/common/ReadingChart';
import { AlertTriangle, Search } from 'lucide-react';

export default function Readings() {
    const [readings] = useState<Reading[]>(mockReadings);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [filter, setFilter] = useState<'all' | 'OOR'>('all');

    const filteredData = useMemo(() => {
        return readings
            .filter(r => {
                const matchesFilter = filter === 'all' || (filter === 'OOR' && r.isOOR);
                const patient = mockPatients.find(p => p.id === r.patientId);
                const matchesSearch = globalFilter === '' ||
                    patient?.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
                    r.type.toLowerCase().includes(globalFilter.toLowerCase());
                return matchesFilter && matchesSearch;
            });
    }, [readings, filter, globalFilter]);

    const columns = useMemo<ColumnDef<Reading>[]>(() => [
        {
            accessorKey: 'patientName',
            header: 'Patient',
            cell: ({ row }) => {
                const patient = mockPatients.find(p => p.id === row.original.patientId);
                return <span className="font-medium">{patient?.name}</span>;
            },
        },
        {
            accessorKey: 'type',
            header: 'Reading Type',
        },
        {
            accessorKey: 'value',
            header: 'Value',
            cell: ({ row }) => `${row.original.value} ${row.original.unit}`,
        },
        {
            accessorKey: 'timestamp',
            header: 'Time',
            cell: ({ row }) => new Date(row.original.timestamp).toLocaleString(),
        },
        {
            accessorKey: 'isOOR',
            header: 'Status',
            cell: ({ row }) => (
                <Badge status={row.original.isOOR ? "OOR" : "Active"} />
            ),
        },
    ], []);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Readings & Vitals</h1>
                    <p className="text-gray-600">{filteredData.length} readings</p>
                </div>
                <Button variant="outline">Manual Entry</Button>
            </div>

            <Card>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search patient or reading type..."
                            className="w-full pl-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary-500"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant={filter === 'all' ? 'primary' : 'outline'}
                            onClick={() => setFilter('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === 'OOR' ? 'primary' : 'outline'}
                            onClick={() => setFilter('OOR')}
                            className="text-red-600"
                        >
                            <AlertTriangle className="w-4 h-4 mr-1" /> OOR Only
                        </Button>
                    </div>
                </div>

                <ReadingChart />

                {/* TanStack Table */}
                <div className="mt-8 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="border-b bg-gray-50">
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-4 text-left font-medium cursor-pointer hover:bg-gray-100"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y">
                            {table.getRowModel().rows.map(row => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    {row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-5">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}