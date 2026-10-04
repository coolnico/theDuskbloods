import { notFound } from 'next/navigation';
import { LOCALES } from './seo';

/** Must be called from page components (not layouts) so 404 keeps the locale <html lang>. */
export function requireValidLocale(locale: string): void {
  if (!(LOCALES as readonly string[]).includes(locale)) notFound();
}
