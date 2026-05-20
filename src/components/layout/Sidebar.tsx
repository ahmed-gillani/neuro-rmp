// src/components/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { Home, Users, UserCheck, MessageSquare, Target, Settings, MapPin, Monitor, ChevronLeft, ChevronRight, FileText } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: MapPin, label: 'Admin', path: '/admin' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: UserCheck, label: 'Staff', path: '/staff' },
  { icon: Monitor, label: 'Devices', path: '/devices' },
  { icon: Target, label: 'Care Plan', path: '/careplan' },
  // { icon: FileText, label: 'Clinical Notes', path: '/notes' },
  { icon: MessageSquare, label: 'Communication', path: '/communication' },
  { icon: Settings, label: 'User Settings', path: '/settings' },
];

export default function Sidebar({ 
  isMobileOpen, 
  setIsMobileOpen, 
  isCollapsed, 
  setIsCollapsed 
}: any) {
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden" 
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside 
        className={`fixed inset-y-0 left-0 z-50 bg-[#0f172a] border-r border-slate-800 
                    transition-all duration-300 ease-in-out flex flex-col
                    ${isCollapsed ? 'w-20' : 'w-64'}
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Logo Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
          {!isCollapsed && (
            <span className="text-xl font-bold text-white">
              Neuro <span className="text-blue-500">RPM</span>
            </span>
          )}
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Scrollable Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 custom-scroll">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <item.icon size={22} className="shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center shrink-0">
          {!isCollapsed && "Neuro RPM v1.0"}
        </div>
      </aside>
    </>
  );
}