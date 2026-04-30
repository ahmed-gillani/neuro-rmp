// // src/components/layout/Layout.tsx
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Navbar from './Navbar';

// export default function Layout() {
//   return (
//     <div className="flex h-screen overflow-hidden bg-[#0f172a] bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
//       {/* Sidebar - Hidden on mobile by default, slides in */}
//       <div className="hidden lg:block">
//         <Sidebar />
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 flex flex-col overflow-hidden w-full">
//         <Navbar />

//         {/* Scrollable Content */}
//         <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Ensure your Sidebar uses <ProSidebar> components
import Navbar from './Navbar';
export default function Layout() {
  return (
    // "h-screen" ensures background covers full height
    <div className="flex h-screen w-full bg-[#0b1120] overflow-hidden">
      
      {/* Sidebar - Fixed width ensures it takes its own space */}
      <div className="flex-shrink-0 z-20">
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        {/* Dashboard Area - Adding subtle depth */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 bg-[#0b1120] bg-gradient-to-tr from-[#0b1120] via-[#0f172a] to-[#111827]">
          {/* Is container se content sidebar ke neeche nahi ghusega */}
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
