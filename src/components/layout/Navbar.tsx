// //src/components/layout/Navbar.tsx
import { Bell, User, Search } from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
}

export default function Navbar({ onToggleSidebar }: NavbarProps) {
  return (
    <header className="h-16 px-4 sm:px-8 flex items-center justify-between border-b border-[rgb(var(--border))] bg-white sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 bg-[rgb(var(--primary))] text-white rounded-lg mr-2"
          aria-label="Open menu"
        >
          ☰
        </button>
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[rgb(var(--muted-foreground))]" />
          <input
            type="text"
            placeholder="Search patients or reports..."
            className="w-full bg-[rgb(var(--muted))] border-none rounded-[var(--radius-btn)] pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-[rgb(var(--primary)/0.2)] outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-[rgb(var(--muted))] rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-[rgb(var(--muted-foreground))]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-[1px] bg-[rgb(var(--border))] mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-[rgb(var(--text-h))]">Dr. Ahmed</p>
            <p className="text-xs text-[rgb(var(--muted-foreground))]">Medical Director</p>
          </div>
          <div className="w-10 h-10 bg-[rgb(var(--primary)/0.1)] rounded-full flex items-center justify-center border border-[rgb(var(--primary)/0.2)]">
            <User className="w-5 h-5 text-[rgb(var(--primary))]" />
          </div>
        </div>
      </div>
    </header>
  );
}