import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, UserCheck, Monitor, FileText, Bell } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: UserCheck, label: 'Staff', path: '/staff' },
  { icon: Monitor, label: 'Devices', path: '/devices' },
  { icon: FileText, label: 'Readings', path: '/readings' },
  { icon: Bell, label: 'Alerts', path: '/alerts' },
  { icon: FileText, label: 'Care Plan', path: '/careplan' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 lg:translate-x-0 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary-600">RPM Platform</h1>
          <p className="text-xs text-gray-500 mt-1">Remote Patient Monitoring</p>
        </div>

        <nav className="mt-8 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
                  isActive 
                    ? 'bg-primary-50 text-primary-600 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}