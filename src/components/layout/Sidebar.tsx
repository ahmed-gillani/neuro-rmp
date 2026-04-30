// // // //src/components/layout/Sidebar.tsx
// import { useState } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Home, Users, UserCheck, MessageSquare, Target, Settings, MapPin } from 'lucide-react';

// const menuItems = [
//   { icon: Home, label: 'Dashboard', path: '/' },
//   { icon: MapPin, label: 'Locations', path: '/locations' },
//   { icon: Settings, label: 'User Settings', path: '/settings' },
//   { icon: Users, label: 'Patients', path: '/patients' },
//   { icon: UserCheck, label: 'Staff', path: '/staff' },
//   { icon: MessageSquare, label: 'Communication', path: '/communication' },
//   { icon: Target, label: 'Care Plan', path: '/careplan' },
// ];

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Mobile Toggle */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-[rgb(var(--primary))] rounded-xl shadow-lg"
//       >
//         <span className="text-2xl text-white">☰</span>
//       </button>

//       <div
//         className={`fixed inset-y-0 left-0 lg:relative lg:translate-x-0 w-64 bg-white border-r border-[rgb(var(--border))] 
//         transform transition-transform duration-300 z-[70] h-full
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
//       >
//         <div className="p-6 border-b border-[rgb(var(--border))]">
//           <h1 className="text-2xl font-bold text-[rgb(var(--primary))] tracking-tight">RPM Portal</h1>
//           <p className="text-[10px] uppercase tracking-widest text-[rgb(var(--muted-foreground))] mt-1 font-semibold">Remote Monitoring</p>
//         </div>

//         <nav className="mt-6 px-3 space-y-1">
//           {menuItems.map((item) => (
//             <NavLink
//               key={item.path}
//               to={item.path}
//               onClick={() => setIsOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 rounded-[var(--radius-btn)] transition-all text-[14px] ${
//                   isActive
//                   ? 'bg-[rgb(var(--primary)/0.1)] text-[rgb(var(--primary))] font-semibold'
//                   : 'text-[rgb(var(--muted-foreground))] hover:bg-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))]'
//                 }`
//               }
//             >
//               <item.icon className="w-5 h-5" />
//               {item.label}
//             </NavLink>
//           ))}
//         </nav>
//       </div>
//     </>
//   );
// }

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
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 bg-[#1e3a8a] rounded-xl shadow-lg"
      >
        <span className="text-2xl text-white">☰</span>
      </button>

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 lg:relative lg:translate-x-0 w-64 
        bg-[#0f172a] border-r border-white/5 
        transform transition-transform duration-300 z-[70] h-full
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-white/5">
          <h1 className="text-2xl font-black text-white tracking-tight">
            RPM <span className="text-blue-500">Portal</span>
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-500 mt-1 font-bold">
            Remote Monitoring
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4 space-y-1.5">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 text-[13.5px] relative ${isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 font-bold'
                  : 'text-gray-600 hover:bg-white/5 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                    }`} />

                  <span className="tracking-wide">{item.label}</span>

                  {/* Subtle Glow for Active Item */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent rounded-2xl" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Profile/Version (Optional) */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">System Status</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-600 font-medium">All systems live</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}