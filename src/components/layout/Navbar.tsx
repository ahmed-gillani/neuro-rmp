import { Bell, User } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between lg:ml-64">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 hover:bg-gray-100 rounded-xl">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">3</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium">Dr. Ahmed</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <div className="w-9 h-9 bg-primary-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-primary-600" />
          </div>
        </div>
      </div>
    </header>
  );
}
