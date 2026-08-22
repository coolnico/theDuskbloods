'use client';

import { Link, usePathname } from '@/i18n/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({ href, children, className = '' }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`relative group ${className}`}
    >
      {children}
      {/* Underline indicator */}
      <span
        className={`
          absolute left-0 -bottom-1 h-0.5 w-full origin-left
          bg-blood transition-transform duration-300 ease-out
          ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
        `}
      />
    </Link>
  );
}
