import { useState } from 'react';
import { mockStaff } from '../data/mockData';
import type { User } from '../types';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Search, Plus, UserCheck, Clock, Users } from 'lucide-react';

export default function Staff() {
    const [staff] = useState<User[]>(mockStaff);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredStaff = staff.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
                    <p className="text-gray-600 mt-1">Team • Performance • Assignments</p>
                </div>
                <Button variant="outline">
                    <Plus className="w-5 h-5 mr-2" />
                    Add Staff Member
                </Button>
            </div>

            {/* Performance Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                            <Users className="w-7 h-7 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">{staff.reduce((sum, s) => sum + (s.patientsAssigned || 0), 0)}</p>
                            <p className="text-sm text-gray-500">Total Patients Assigned</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center">
                            <Clock className="w-7 h-7 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold">
                                {staff.reduce((sum, s) => sum + (s.minutesLogged || 0), 0)}
                            </p>
                            <p className="text-sm text-gray-500">Minutes Logged (This Month)</p>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
                            <span className="text-2xl">📈</span>
                        </div>
                        <div>
                            <p className="text-3xl font-bold">
                                {Math.round(staff.reduce((sum, s) => sum + (s.contactRate || 0), 0) / staff.length)}%
                            </p>
                            <p className="text-sm text-gray-500">Avg Contact Rate</p>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Staff List */}
            <Card>
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search staff by name or role..."
                        className="w-full pl-11 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-primary-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredStaff.map((member) => (
                        <div key={member.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center">
                                    <UserCheck className="w-8 h-8 text-primary-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-lg">{member.name}</p>
                                    <p className="text-sm text-gray-500">{member.email}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-between items-center">
                                <div>
                                    <p className="text-xs text-gray-500">ROLE</p>
                                    <p className="font-medium">{member.role}</p>
                                </div>
                                <Badge status="Active" />
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-4 text-center border-t pt-6">
                                <div>
                                    <p className="text-2xl font-bold text-primary-600">{member.patientsAssigned}</p>
                                    <p className="text-xs text-gray-500">Patients</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{member.minutesLogged}</p>
                                    <p className="text-xs text-gray-500">Minutes</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-emerald-600">{member.contactRate}%</p>
                                    <p className="text-xs text-gray-500">Contact</p>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3">
                                <Button variant="outline" size="sm" className="flex-1">Edit</Button>
                                <Button variant="outline" size="sm" className="flex-1">Permissions</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}