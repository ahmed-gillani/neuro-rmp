// src/components/layout/Navbar.tsx
import { Bell, User, Search, Menu } from 'lucide-react';

export default function Navbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  return (
    <header className="h-14 border-b bg-white/90 backdrop-blur-md sticky top-0 z-30 px-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button onClick={onToggleSidebar} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg shrink-0">
          <Menu size={18} />
        </button>

        {/* Fluid Search Bar - No more disappearing */}
        <div className="relative max-w-md w-full flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-1.5 text-sm focus:ring-2 focus:ring-blue-500/10 outline-none transition-all border-none sm:border-solid"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-100">
          <div className="hidden xs:block text-right">
            <p className="text-xs font-bold text-slate-900 leading-none">Dr. Ahmed</p>
            <p className="text-[10px] text-slate-500 mt-1">Admin</p>
          </div>
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}