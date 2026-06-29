'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import {
  LayoutDashboard,
  Box,
  ShoppingCart,
  Package,
  Users,
  FileText,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Products',
    href: '/dashboard/products',
    icon: Box,
  },
  {
    label: 'Orders',
    href: '/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    label: 'Warehouses',
    href: '/dashboard/warehouses',
    icon: Package,
  },
  {
    label: 'Suppliers',
    href: '/dashboard/suppliers',
    icon: Users,
  },
  {
    label: 'Audit Logs',
    href: '/dashboard/audit-logs',
    icon: FileText,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        'bg-slate-900 text-white transition-all duration-300 flex flex-col border-r border-slate-800',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-blue-400">InventoryPro</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-white hover:bg-slate-800"
          >
            <ChevronDown
              className={cn(
                'w-4 h-4 transition-transform',
                !sidebarOpen && 'rotate-90'
              )}
            />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                'w-full justify-start text-white hover:bg-slate-800',
                isActive && 'bg-blue-600 hover:bg-blue-700'
              )}
              onClick={() => router.push(item.href)}
            >
              <Icon className="w-5 h-5 mr-3" />
              {sidebarOpen && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
