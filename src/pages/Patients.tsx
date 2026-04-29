import { useState, useMemo } from 'react';
import { mockPatients } from '../data/mockData';
import type { Patient } from '../types';
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
import Modal from '../components/common/Modal';
import PatientCard from '../components/common/PatientCard';
import { Plus, Search, ArrowUpDown } from 'lucide-react';

export default function Patients() {
    const [patients] = useState<Patient[]>(mockPatients);
    const [globalFilter, setGlobalFilter] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const columns = useMemo<ColumnDef<Patient>[]>(() => [
        {
            accessorKey: 'name',
            header: 'Patient',
            cell: ({ row }) => (
                <div>
                    <p className="font-medium">{row.original.name}</p>
                    <p className="text-xs text-gray-500">{row.original.phone}</p>
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => <Badge status={row.original.status} />,
        },
        {
            accessorKey: 'primaryProvider',
            header: 'Provider',
        },
        {
            accessorKey: 'enrollmentDate',
            header: 'Enrollment Date',
        },
        {
            accessorKey: 'lastReadingDate',
            header: 'Last Reading',
            cell: ({ row }) => row.original.lastReadingDate || '—',
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedPatient(row.original)}
                >
                    View
                </Button>
            ),
        },
    ], []);

    const table = useReactTable({
        data: patients,
        columns,
        state: { sorting, globalFilter },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Patients</h1>
                    <p className="text-gray-600 mt-1">Total: {patients.length} patients</p>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" onClick={() => window.location.href = '/onboarding'}>
                        New Patient Onboarding
                    </Button>

                </div>
            </div>

            <Card>
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by name or provider..."
                        className="w-full pl-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary-500"
                        value={globalFilter}
                        onChange={(e) => setGlobalFilter(e.target.value)}
                    />
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block">
                    <table className="w-full text-sm">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="border-b bg-gray-50">
                                    {headerGroup.headers.map(header => (
                                        <th
                                            key={header.id}
                                            className="px-6 py-4 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getIsSorted() && (
                                                <ArrowUpDown className="inline ml-1 w-4 h-4" />
                                            )}
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

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {table.getRowModel().rows.map(row => (
                        <PatientCard
                            key={row.id}
                            patient={row.original}
                            onView={setSelectedPatient}
                        />
                    ))}
                </div>
            </Card>

            {/* Patient Detail Modal */}
            <Modal
                isOpen={!!selectedPatient}
                onClose={() => setSelectedPatient(null)}
                title={selectedPatient?.name || ''}
            >
                {selectedPatient && (
                    <div className="space-y-6">
                        <Badge status={selectedPatient.status} />
                        <div className="grid grid-cols-2 gap-6 text-sm">
                            <div>
                                <p className="text-gray-500">Provider</p>
                                <p className="font-medium">{selectedPatient.primaryProvider}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Enrolled</p>
                                <p className="font-medium">{selectedPatient.enrollmentDate}</p>
                            </div>
                        </div>
                        <Button className="w-full">Edit Patient</Button>
                    </div>
                )}
            </Modal>
        </div>
    );
}