import Image from 'next/image';
import { Star } from 'lucide-react';

export function BookCard({ book, dict, onClick }) {
  const categoryEmoji = {
    bengali_classics: '📖',
    sirah: '📿',
    islamic_history: '🕌',
    islamic_sciences: '📚',
    spirituality: '✨',
    productivity: '⚡',
  };

  const statusColor = {
    read: 'bg-green-500/20 text-green-700 dark:text-green-400',
    reading: 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
    wishlist: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
  };

  const statusLabel = {
    read: dict?.books?.status_read ?? 'Read',
    reading: dict?.books?.status_reading ?? 'Reading',
    wishlist: dict?.books?.status_wishlist ?? 'To read',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${book.title} — ${book.author}`}
      className="group flex flex-col text-left items-stretch rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden transition-all hover:shadow-lg hover:border-accent hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--background))] cursor-pointer"
    >
      {/* Cover */}
      <div className="relative h-56 overflow-hidden bg-[hsl(var(--muted))]">
        {book.cover?.url ? (
          <Image
            src={book.cover.url}
            alt={book.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {categoryEmoji[book.category] || '📕'}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4">
        {/* Status */}
        <div className="mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor[book.status]}`}>
            {statusLabel[book.status]}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-base mb-1 line-clamp-2 group-hover:text-accent transition-colors">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-sm text-muted-foreground mb-3">{book.author}</p>

        {/* Rating */}
        {book.rating && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < book.rating
                    ? 'fill-accent text-accent'
                    : 'text-muted-foreground'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({book.rating})</span>
          </div>
        )}

        {/* Notes snippet */}
        {book.notes && (
          <p className="text-xs text-muted-foreground line-clamp-2 italic">
            &ldquo;{book.notes.substring(0, 100)}&hellip;&rdquo;
          </p>
        )}
      </div>
    </button>
  );
}
