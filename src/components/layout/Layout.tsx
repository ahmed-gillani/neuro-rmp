// src/components/layout/Layout.tsx
import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Check if we are on the Patient Detail/Profile page
  const isPatientProfile = location.pathname.includes('/patients/') && 
                          location.pathname !== '/patients';

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - Desktop and Mobile */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out
        ${isCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>

        <Navbar onToggleSidebar={() => setIsMobileOpen(!isMobileOpen)} />

        {/* Dynamic Main Tag */}
        <main className={`flex-1 overflow-y-auto overflow-x-hidden ${isPatientProfile ? 'p-0' : 'p-3 sm:p-4 lg:p-5'}`}>
          <div className={`${isPatientProfile ? 'w-full max-w-none' : 'w-full max-w-[1600px] mx-auto'}`}>
            <Outlet />
          </div>
        </main>
        
      </div>
    </div>
  );
}