'use client';

import { useState } from 'react';
import { BookCard } from '@/components/cards/book-card';

export function BooksTabs({ initialBooks, dict }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: dict.books.filter_all },
    { id: 'bengali_classics', label: dict.books.categories.bengali_classics },
    { id: 'sirah', label: dict.books.categories.sirah },
    { id: 'islamic_history', label: dict.books.categories.islamic_history },
    { id: 'islamic_sciences', label: dict.books.categories.islamic_sciences },
    { id: 'spirituality', label: dict.books.categories.spirituality },
    { id: 'productivity', label: dict.books.categories.productivity },
  ];

  const filteredBooks =
    activeCategory === 'all'
      ? initialBooks
      : initialBooks.filter((book) => book.category === activeCategory);

  const stats = {
    total: initialBooks.length,
    categories: new Set(initialBooks.map((book) => book.category)).size,
    languages: new Set(initialBooks.map((book) => book.language)).size,
  };

  return (
    <>
      {/* Stats */}
      <div className="mb-12 grid grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-3xl font-bold text-accent">{stats.total}</div>
          <p className="text-sm text-muted-foreground mt-1">{dict.books.books_count}</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-accent">{stats.categories}</div>
          <p className="text-sm text-muted-foreground mt-1">{dict.books.categories_count}</p>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-accent">{stats.languages}</div>
          <p className="text-sm text-muted-foreground mt-1">{dict.books.languages_count}</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-accent text-[hsl(var(--accent-foreground))]'
                  : 'bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))]/80'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} dict={dict} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-96">
          <p className="text-muted-foreground text-center max-w-md">
            {dict.common.no_books_found || 'Nessun libro in questa categoria.'}
          </p>
        </div>
      )}
    </>
  );
}
