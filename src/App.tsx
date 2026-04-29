import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';   // ← Add this
import Readings from './pages/Readings';
import Staff from './pages/Staff';
import Devices from './pages/Devices';
import PatientOnboarding from './pages/PatientOnboarding';
import Alerts from './pages/Alerts';
import CarePlan from './pages/CarePlan';
function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/readings" element={<Readings />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/careplan" element={<CarePlan />} />
          <Route path="/onboarding" element={<PatientOnboarding />} />
          <Route path="/patients" element={<Patients />} />   {/* ← Add this */}
          <Route path="/devices" element={<Devices />} />   {/* ← Add this */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;