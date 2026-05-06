// // // src/components/layout/Layout.tsx
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Lock body scroll when mobile sidebar is open
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen w-full bg-[rgb(var(--background))]">
      {/* Sidebar */}
      <div className="flex-shrink-0 z-20">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Navbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">
            {/* Page content comes here */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}