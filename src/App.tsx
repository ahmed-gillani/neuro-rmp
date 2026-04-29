import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Staff from './pages/Staff';
import PatientOnboarding from './pages/PatientOnboarding';
import CarePlan from './pages/CarePlan';
import Communication from './pages/Communication';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/communication" element={<Communication />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/careplan" element={<CarePlan />} />
          <Route path="/onboarding" element={<PatientOnboarding />} />
          <Route path="/patients" element={<Patients />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;