import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@/messages/en.json';

export default function NotFound() {
  return (
    <NextIntlClientProvider locale="en" messages={enMessages} timeZone="UTC">
      <div className="site flex min-h-screen flex-col">
        <Header />
        <main className="relative z-10 flex-1">
          <div className="shell py-10 sm:py-16">
            <div className="py-24 text-center">
              <div className="font-heading text-6xl font-bold text-blood">404</div>
              <p className="mt-4 text-muted">Page not found.</p>
              <div className="mt-8">
                <Link href="/" className="btn-primary">Back to Home</Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}
