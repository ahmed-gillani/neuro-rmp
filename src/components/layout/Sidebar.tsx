// // //src/components/layout/Sidebar.tsx
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, UserCheck, MessageSquare, Target, Settings, MapPin } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: MapPin, label: 'Locations', path: '/locations' },
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
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-[rgb(var(--primary))] rounded-xl shadow-lg"
      >
        <span className="text-2xl text-white">☰</span>
      </button>

      <div
        className={`fixed inset-y-0 left-0 lg:relative lg:translate-x-0 w-64 bg-white border-r border-[rgb(var(--border))] 
        transform transition-transform duration-300 z-[70] h-full
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 border-b border-[rgb(var(--border))]">
          <h1 className="text-2xl font-bold text-[rgb(var(--primary))] tracking-tight">RPM Portal</h1>
          <p className="text-[10px] uppercase tracking-widest text-[rgb(var(--muted-foreground))] mt-1 font-semibold">Remote Monitoring</p>
        </div>

        <nav className="mt-6 px-3 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-[var(--radius-btn)] transition-all text-[14px] ${
                  isActive
                  ? 'bg-[rgb(var(--primary)/0.1)] text-[rgb(var(--primary))] font-semibold'
                  : 'text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]'
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