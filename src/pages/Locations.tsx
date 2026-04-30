import React, { useState } from 'react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';
import type { ColumnDef } from '@tanstack/react-table';
import { Edit, Trash2 } from 'lucide-react';

interface Location {
    id: number;
    name: string;
    address: string;
    phone: string;
    fax?: string;
    status: 'Active' | 'Inactive';
}

const LocationManagement: React.FC = () => {
    const [locations, setLocations] = useState<Location[]>([
        {
            id: 1,
            name: "Main Clinic - Gujranwala",
            address: "GT Road, Near WAPDA Town, Gujranwala, Punjab",
            phone: "+92 300 1234567",
            fax: "+92 55 1234567",
            status: "Active"
        },
        {
            id: 2,
            name: "Satellite Clinic - Satellite Town",
            address: "Satellite Town, Block C, Gujranwala",
            phone: "+92 301 9876543",
            status: "Active"
        },
        {
            id: 3,
            name: "Branch Clinic - Rahwali",
            address: "Grand Trunk Road, Rahwali Cantt, Gujranwala",
            phone: "+92 322 5558899",
            fax: "+92 55 2223344",
            status: "Inactive"
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingLocation, setEditingLocation] = useState<Location | null>(null);
    const [formData, setFormData] = useState<Partial<Location>>({});

    const handleAddNew = () => {
        setEditingLocation(null);
        setFormData({});
        setShowModal(true);
    };

    const handleEdit = (location: Location) => {
        setEditingLocation(location);
        setFormData(location);
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this location?")) {
            setLocations(prev => prev.filter(loc => loc.id !== id));
        }
    };

    const handleSave = () => {
        if (!formData.name?.trim() || !formData.address?.trim() || !formData.phone?.trim()) {
            alert("Clinic Name, Address and Phone are required!");
            return;
        }

        if (editingLocation) {
            setLocations(prev =>
                prev.map(loc =>
                    loc.id === editingLocation.id ? { ...loc, ...formData } as Location : loc
                )
            );
        } else {
            const newLocation: Location = {
                id: Date.now(),
                name: formData.name!,
                address: formData.address!,
                phone: formData.phone!,
                fax: formData.fax,
                status: formData.status || "Active",
            };
            setLocations(prev => [...prev, newLocation]);
        }

        setShowModal(false);
        setFormData({});
        setEditingLocation(null);
    };

    const columns: ColumnDef<Location>[] = [
        { accessorKey: "name", header: "Clinic Name" },
        { accessorKey: "address", header: "Address" },
        { accessorKey: "phone", header: "Phone" },
        {
            accessorKey: "fax",
            header: "Fax",
            cell: ({ row }) => row.original.fax || <span className="text-gray-600">—</span>,
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${row.original.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                >
                    {row.original.status}
                </span>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex gap-4">
                    <button
                        onClick={() => handleEdit(row.original)}
                        className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        <Edit size={18} />
                    </button>
                    <button
                        onClick={() => handleDelete(row.original.id)}
                        className="text-red-600 hover:text-red-700 transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6 p-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-800">Clinic Locations</h1>
                <button
                    onClick={handleAddNew}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-medium"
                >
                    + Add New Location
                </button>
            </div>

            <DataTable data={locations} columns={columns} />

            {/* Modal using your component */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={editingLocation ? "Edit Location" : "Add New Location"}
            >
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1.5">Clinic Name <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={formData.name || ''}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                            placeholder="e.g. Main Clinic - Gujranwala"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">Full Address <span className="text-red-500">*</span></label>
                        <textarea
                            value={formData.address || ''}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                            placeholder="Complete address of clinic"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                            <input
                                type="tel"
                                value={formData.phone || ''}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                                placeholder="+92 300 1234567"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1.5">Fax (Optional)</label>
                            <input
                                type="text"
                                value={formData.fax || ''}
                                onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                                placeholder="+92 55 1234567"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1.5">Status</label>
                        <select
                            value={formData.status || "Active"}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-3 pt-6">
                        <button
                            onClick={() => setShowModal(false)}
                            className="px-6 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium"
                        >
                            {editingLocation ? "Update Location" : "Add Location"}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default LocationManagement;