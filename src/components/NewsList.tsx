import { Link } from '@/i18n/navigation';
import { Calendar } from 'lucide-react';
import type { ArticleMeta } from '@/lib/news';

interface NewsListProps {
  articles: ArticleMeta[];
  locale: string;
  noArticlesText: string;
}

export default function NewsList({ articles, locale, noArticlesText }: NewsListProps) {
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Link key={article.slug} href={`/latest/${article.slug}`} locale={locale} className="card block group">
          <div className="flex items-center gap-2 text-xs text-muted">
            <Calendar className="h-3.5 w-3.5" />
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
          <h2 className="mt-2 font-heading text-lg font-bold text-text group-hover:text-blood transition-colors">
            {article.title}
          </h2>
          <p className="mt-1 text-sm text-muted">{article.summary}</p>
        </Link>
      ))}
      {articles.length === 0 && (
        <p className="text-muted">{noArticlesText}</p>
      )}
    </div>
  );
}
