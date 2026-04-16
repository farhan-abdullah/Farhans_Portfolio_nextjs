import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

export function BlogCard({ post, lang }) {
  const publishDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString(lang === 'en' ? 'en-US' : 'it-IT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <Link href={`/${lang}/blog/${post.slug}`}>
      <article className="group overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all hover:border-accent hover:shadow-lg">
        {/* Cover */}
        {post.cover?.url && (
          <div className="relative h-48 overflow-hidden bg-[hsl(var(--muted))]">
            <Image
              src={post.cover.url}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
            {publishDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {publishDate}
              </div>
            )}
            {post.readingTime && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {post.readingTime} min
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-accent transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 2).map((item, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded px-2 py-1"
                >
                  {item.tag}
                </span>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm font-medium text-accent">
            Leggi <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}
