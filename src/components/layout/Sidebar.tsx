// //src/components/layout/Sidebar.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, UserCheck, MessageSquare, Target, Settings } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Locations', path: '/locations' },
  { icon: Settings, label: 'User Settings', path: '/settings' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: UserCheck, label: 'Staff', path: '/staff' },
  { icon: MessageSquare, label: 'Communication', path: '/communication' },
  { icon: Target, label: 'Care Plan', path: '/careplan' },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-[#13395e] rounded-2xl shadow-lg border border-[#1e4a7a]"
      >
        <span className="text-2xl text-[#b6c8d9]">☰</span>
      </button>

      {/* <div
        className={`fixed inset-y-0 left-0 w-64 bg-[#13395e] border-r border-[#1e4a7a] 
          transform transition-transform duration-300 z-[70]
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      > */}
      <div
        className={`fixed inset-y-0 left-0 lg:relative lg:translate-x-0 w-64 bg-[#0f172a] border-r border-slate-800 
    transform transition-transform duration-300 z-[70] h-full
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-[#1e4a7a]">
          <h1 className="text-3xl font-bold text-[#b6c8d9]">RPM</h1>
          <p className="text-xs text-[#b6c8d9] mt-1">Remote Patient Monitoring</p>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-5 py-3.5 rounded-2xl mb-1 transition-all text-[15px] text-[#b6c8d9] hover:text-white ${isActive
                  ? 'bg-[#1e4a7a] text-white font-semibold'
                  : 'hover:bg-[#1e4a7a]/70'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
}