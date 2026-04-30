//src/components/layout/Navbar.tsx
import { Bell, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header
      className="h-16 px-6 flex items-center justify-between border-b border-[#1e4a7a]"
      style={{ backgroundColor: '#13395e' }}
    >
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-[#b6c8d9]">Dashboard</h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 hover:bg-[#1e4a7a] rounded-xl transition-colors">
          <Bell className="w-5 h-5 text-[#b6c8d9]" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-white">Dr. Ahmed</p>
            <p className="text-xs text-[#b6c8d9]">Admin</p>
          </div>
          <div className="w-9 h-9 bg-[#1e4a7a] rounded-full flex items-center justify-center border border-[#b6c8d9]/30">
            <User className="w-5 h-5 text-[#b6c8d9]" />
          </div>
        </div>
      </div>
    </header>
  );
}