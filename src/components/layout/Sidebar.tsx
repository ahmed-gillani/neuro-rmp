// src/components/layout/Sidebar.tsx
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  UserCheck,
  MessageSquare,
  Target,
  Settings,
  MapPin,
  Monitor,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: MapPin, label: 'Admin', path: '/admin' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: UserCheck, label: 'Staff', path: '/staff' },
  { icon: Monitor, label: 'Devices', path: '/devices' },
  { icon: Target, label: 'Care Plan', path: '/careplan' },
  { icon: MessageSquare, label: 'Communication', path: '/communication' },
  { icon: Settings, label: 'User Settings', path: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop Collapse

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <>
      {/* Mobile overlay (closes sidebar when tapped) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-60 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 lg:relative lg:translate-x-0 
          ${isCollapsed ? 'w-20' : 'w-64'} 
          bg-[#0f172a] border-r border-white/10 h-full z-[70]
          transform transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo + Collapse Button */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-2xl font-black text-white tracking-tight">
              RPM <span className="text-blue-400">Portal</span>
            </h1>
          )}

          {/* Collapse Toggle Button (Desktop Only) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex items-center justify-center w-8 h-8 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[14.5px] font-medium transition-all duration-200 ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30'
                  : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`w-5 h-5 transition-all flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                      }`}
                  />
                  {!isCollapsed && <span className="tracking-wide">{item.label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Status */}
        {!isCollapsed && (
          <div className="absolute bottom-6 left-6 right-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">System Status</p>
              <p className="text-green-400 text-sm font-bold">All Systems Operational</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}