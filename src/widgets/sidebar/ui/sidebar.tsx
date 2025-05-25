'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      label: '홈',
      href: '/',
    },
    {
      label: '혈당',
      href: '/glucose',
    },
    {
      label: '혈압',
      href: '/blood-pressure',
    },
  ];

  return (
    <aside className="w-3xs px-4 py-7 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.1)]">
      <div className="mb-10">
        <span className="text-2xl font-bold tracking-tight text-gray-900">HealthLog</span>
      </div>

      <nav className="mt-4">
        <ul className="flex flex-col gap-2">
          <li>
            {menuItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition hover:bg-indigo-100 border-l-4 ${
                  pathname === item.href
                    ? 'text-indigo-600 bg-indigo-50 border-l-4 border-indigo-600 font-semibold'
                    : 'text-gray-500 border-l-4 border-transparent font-medium'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </li>
        </ul>
      </nav>
    </aside>
  );
}
