import { useState } from 'react';
import { mockDevices, mockPatients } from '../data/mockData';
import type { Device } from '../types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Search, Plus, RefreshCw } from 'lucide-react';

const statusColors: Record<string, string> = {
    Assigned: 'bg-green-100 text-green-700',
    Available: 'bg-blue-100 text-blue-700',
    'In Repair': 'bg-orange-100 text-orange-700',
    Retired: 'bg-gray-100 text-gray-700',
};

export default function Devices() {
    const [devices] = useState<Device[]>(mockDevices);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredDevices = devices.filter(device =>
        device.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Device Management</h1>
                    <p className="text-gray-600">Inventory • Assignments • Status</p>
                </div>
                <Button variant="outline">
                    <Plus className="w-5 h-5 mr-2" />
                    Add New Device
                </Button>
            </div>

            <Card>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by device type or serial..."
                            className="w-full pl-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <RefreshCw className="w-5 h-5" /> Sync Inventory
                    </Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-4 text-left">Device Type</th>
                                <th className="px-6 py-4 text-left">Serial Number</th>
                                <th className="px-6 py-4 text-left">Assigned To</th>
                                <th className="px-6 py-4 text-left">Status</th>
                                <th className="px-6 py-4 text-left">Last Connected</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredDevices.map((device) => {
                                const patient = mockPatients.find(p => p.id === device.patientId);
                                return (
                                    <tr key={device.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-5 font-medium">{device.type}</td>
                                        <td className="px-6 py-5 font-mono text-gray-600">{device.serialNumber}</td>
                                        <td className="px-6 py-5">
                                            {patient ? patient.name : <span className="text-gray-400">— Unassigned —</span>}
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusColors[device.status]}`}>
                                                {device.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-gray-600 text-sm">
                                            {device.lastConnected
                                                ? new Date(device.lastConnected).toLocaleDateString()
                                                : 'Never'}
                                        </td>
                                        <td className="px-6 py-5">
                                            <Button variant="outline" size="sm">Manage</Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}