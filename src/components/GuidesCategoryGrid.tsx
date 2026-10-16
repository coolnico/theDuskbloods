import { Link } from '@/i18n/navigation';
import { ChevronRight } from 'lucide-react';

interface CategoryCard {
  slug: string;
  title: string;
  desc: string;
  count: number;
  latestTitle?: string;
}

interface GuidesCategoryGridProps {
  categories: CategoryCard[];
  locale: string;
}

export default function GuidesCategoryGrid({ categories, locale }: GuidesCategoryGridProps) {
  return (
    <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((c) => (
        <Link
          key={c.slug}
          href={`/guides/${c.slug}`}
          locale={locale}
          className="card group flex flex-col transition hover:border-blood"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-base font-bold text-text group-hover:text-blood transition-colors">
              {c.title}
            </h3>
            <ChevronRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-1" />
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{c.desc}</p>
          <div className="mt-auto pt-3 flex items-baseline gap-2 text-xs text-muted">
            <span className="font-semibold text-gold">{c.count}</span>
            <span>guides</span>
          </div>
          {c.latestTitle && (
            <p className="mt-1 text-xs text-muted/80 line-clamp-1">{c.latestTitle}</p>
          )}
        </Link>
      ))}
    </div>
  );
}
