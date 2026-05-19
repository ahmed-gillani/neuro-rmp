// src/components/dashboard/DashboardLayout.tsx
import { useNavigate } from 'react-router-dom';
import { useDashboardData } from '../../hooks/useDashboardData';

import DashboardWidgetSelector from './DashboardWidgetSelector';

import StatCard from '../common/StatCard';
import { Users, Activity, Clock } from 'lucide-react';

export default function DashboardLayout() {
    const navigate = useNavigate();
    const {
        oorReadings,
        dailies,
        alerts,
        aiInsight,
        cptLogs,
        acknowledgeOor,
        markDailyReviewed,
        bulkAcknowledgeDailies,
    } = useDashboardData();

    const handleViewPatient = (patientId: string) => {
        navigate(`/patients/${patientId}`);
    };

    const handleResolveAlert = (id: string) => {
        console.log('Alert Resolved:', id);
        // Yahan aap apna resolve logic add kar sakte hain (store ya API call)
    };

    return (
        <div className="space-y-6 pb-8">
            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard 
                    title="Active Patients" 
                    value="184" 
                    icon={Users} 
                    color="#0ea5e9" 
                    trend={{ value: 12, isUp: true }} 
                />
                <StatCard 
                    title="Today's Readings" 
                    value={dailies.length + 12} 
                    icon={Activity} 
                    color="#8b5cf6" 
                />
                <StatCard 
                    title="Avg Daily Minutes" 
                    value="41" 
                    icon={Clock} 
                    color="#10b981" 
                    trend={{ value: 7, isUp: true }} 
                />
            </div>

            {/* Dropdown Powered Dashboard */}
            <DashboardWidgetSelector
                oorReadings={oorReadings}
                dailies={dailies}
                alerts={alerts}
                aiInsight={aiInsight}
                cptLogs={cptLogs}
                onViewPatient={handleViewPatient}
                acknowledgeOor={acknowledgeOor}
                markDailyReviewed={markDailyReviewed}
                bulkAcknowledgeDailies={bulkAcknowledgeDailies}
                onResolveAlert={handleResolveAlert}
            />
        </div>
    );
}