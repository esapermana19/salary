'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  LayoutGrid,
  Database,
  Building2,
  Briefcase,
  Users,
  UserSquare2,
  Settings,
  CalendarCheck,
  CalendarDays,
  Wallet,
  ChevronDown,
  ChevronUp,
  LogOut
} from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>('Master');

  const toggleMenu = (menuName: string) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutGrid size={20} />
    },
    {
      name: 'Master',
      href: '/dashboard',
      icon: <Database size={20} />,
      subMenu: [
        { name: 'Divisi', href: '/dashboard/divisi', icon: <Building2 size={18} /> },
        { name: 'Jabatan', href: '/dashboard/jabatan', icon: <Briefcase size={18} /> },
        { name: 'Karyawan', href: '/dashboard/karyawan', icon: <Users size={18} /> },
        { name: 'User', href: '/dashboard/user', icon: <UserSquare2 size={18} /> },
        { name: 'Konfigurasi', href: '/dashboard/konfigurasi', icon: <Settings size={18} /> }
      ]
    },
    {
      name: 'Presensi',
      href: '/dashboard/presensi',
      icon: <CalendarCheck size={20} />
    },
    {
      name: 'Cuti',
      href: '/dashboard/cuti',
      icon: <CalendarDays size={20} />
    },
    {
      name: 'Gaji',
      href: '/dashboard/gaji',
      icon: <Wallet size={20} />
    }
  ];

  return (
    <aside className="w-64 bg-slate-800 min-h-screen text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-white">Salary</span>
            <span className="text-teal-400">App</span>
          </h1>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.name}>
            {item.subMenu ? (
              <>
                <button
                  onClick={() => toggleMenu(item.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.href) || (item.subMenu && item.subMenu.some(sub => isActive(sub.href)))
                      ? 'bg-slate-700 border-2 border-teal-500'
                      : 'hover:bg-slate-700/50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-300">
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  {openMenu === item.name ? (
                    <ChevronUp size={18} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={18} className="text-slate-400" />
                  )}
                </button>

                {/* Sub Menu */}
                {openMenu === item.name && (
                  <div className="ml-4 mt-1 space-y-1 border-l-2 border-slate-600 pl-2">
                    {item.subMenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive(subItem.href)
                            ? 'bg-teal-600 text-white'
                            : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                        }`}
                      >
                        <span>
                          {subItem.icon}
                        </span>
                        <span className="text-sm">{subItem.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-slate-700 border-2 border-teal-500'
                    : 'hover:bg-slate-700/50 border-2 border-transparent'
                }`}
              >
                <span className="text-slate-300">
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-700/50">
          <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
            <span className="font-semibold">AD</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-slate-400">admin@salaryapp.com</p>
          </div>
          <button className="text-slate-400 hover:text-white">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}