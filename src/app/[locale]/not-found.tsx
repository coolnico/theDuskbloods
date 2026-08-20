'use client';

import { Link } from '@/i18n/navigation';

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <div className="font-heading text-6xl font-bold text-blood">404</div>
      <p className="mt-4 text-muted">Page not found.</p>
      <div className="mt-8">
        <Link href="/" className="btn-primary">Home</Link>
      </div>
    </div>
  );
}
