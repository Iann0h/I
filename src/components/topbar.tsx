'use client';

import { useAuth } from '@/hooks/use-auth';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function Topbar() {
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        {/* User Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.role}</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4" />
          </Button>

          {/* User Menu Dropdown */}
          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
              <button
                onClick={() => router.push('/dashboard/settings')}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Profile Settings
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
