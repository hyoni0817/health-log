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
    <aside className="w-3xs px-2 py-7 bg-(--background) border-r-1 border-r-(--divider)">
      <div className="mb-10">
        <span className="text-2xl font-bold tracking-tight text-gray-900">HealthLog</span>
      </div>

      <nav className="mt-4">
        <ul className="flex flex-col gap-1">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block w-full text-(--text) text-base font-medium px-3 py-2 hover:bg-(--nav-hover) rounded-lg
                  ${pathname === item.href ? 'text-(--text) bg-(--nav-active) ' : 'text-(--text-subtitle)'}
                  `}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
