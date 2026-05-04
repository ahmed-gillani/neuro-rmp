import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Staff from './pages/Staff';
import PatientOnboarding from './pages/PatientOnboarding';
import CarePlan from './pages/CarePlan';
import Communication from './pages/Communication';
import UserSettings from './pages/OrganizationSettings';
import LocationManagement from './pages/Locations'; 
import Devices from './pages/Devices';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="bg-[#0f172a] bg-gradient-to-br from-[#0f172a] to-[#1e293b] min-h-screen text-[#b6c8d9]">
      <Router>
        <Routes>
          <Route element={<Layout />}> {/* Layout wraps all pages */}
            <Route path="/communication" element={<Communication />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/locations" element={<LocationManagement />} />
            <Route path="/settings" element={<UserSettings />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/careplan" element={<CarePlan />} />
            <Route path="/onboarding" element={<PatientOnboarding />} />
            <Route path="/patients" element={<Patients />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;