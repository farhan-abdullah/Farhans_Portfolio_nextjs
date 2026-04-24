"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BookOpen,
  Calendar,
  ExternalLink,
  Globe,
  Star,
  Tag,
  X,
} from "lucide-react";

/**
 * Full-details modal for a single book.
 * - Matches the BookCard design language (rounded-lg, border, bg-card, accent).
 * - Mobile: bottom sheet feel (items-end, rounded top), info column scrolls.
 * - Desktop: centered modal, wider width, still stacked so the cover keeps its card-like prominence.
 * - Body scroll lock, Esc to close, backdrop click to close, Tab focus trap, focus restore.
 * - Rendered via createPortal into document.body so navbar z-index / stacking can't overlap it.
 */

const CATEGORY_EMOJI = {
  bengali_classics: "📖",
  sirah: "📿",
  history_civilization: "🕌",
  sciences_technology: "📚",
  spirituality: "✨",
  productivity: "⚡",
};

const STATUS_COLOR = {
  read: "bg-green-500/20 text-green-700 dark:text-green-400",
  reading: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
  wishlist: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
};

const INTL_LOCALE = {
  it: "it-IT",
  en: "en-US",
  bn: "bn-BD",
};

function formatDate(dateStr, lang) {
  if (!dateStr) return null;
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return null;
    return new Intl.DateTimeFormat(INTL_LOCALE[lang] ?? "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(d);
  } catch {
    return null;
  }
}

export function BookDetailsModal({ book, dict, lang, onClose }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Guard against SSR (createPortal needs document)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Open-time side effects: scroll lock, esc, focus trap, focus restore.
  useEffect(() => {
    const previouslyFocused =
      typeof document !== "undefined" ? document.activeElement : null;

    // Lock body scroll and compensate for scrollbar to avoid layout shift.
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarW =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarW > 0) {
      document.body.style.paddingRight = `${scrollbarW}px`;
    }

    // Focus the close button after mount (next frame so DOM is painted).
    const rafId = requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current?.();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      if (previouslyFocused instanceof HTMLElement) {
        // Restore focus to whatever triggered the modal (e.g. the book card button)
        previouslyFocused.focus();
      }
    };
  }, []);

  // Only close on a real backdrop click (mousedown AND click both on backdrop).
  const mouseDownTargetRef = useRef(null);
  const handleBackdropMouseDown = (e) => {
    mouseDownTargetRef.current = e.target;
  };
  const handleBackdropClick = (e) => {
    if (
      e.target === e.currentTarget &&
      mouseDownTargetRef.current === e.currentTarget
    ) {
      onCloseRef.current?.();
    }
  };

  if (!mounted || !book) return null;

  const statusLabel = {
    read: dict?.books?.status_read ?? "Read",
    reading: dict?.books?.status_reading ?? "Reading",
    wishlist: dict?.books?.status_wishlist ?? "To read",
  };
  const categoryLabel =
    dict?.books?.categories?.[book.category] ?? book.category;
  const languageLabel =
    dict?.books?.languages?.[book.language] ??
    (book.language ? book.language.toUpperCase() : null);
  const finishedStr = formatDate(book.finishedAt, lang);

  const modal = (
    <div
      aria-hidden={false}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 backdrop-blur-sm animate-[fadeIn_0.18s_ease-out] sm:items-center sm:justify-center sm:p-4 md:p-6"
      onMouseDown={handleBackdropMouseDown}
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-modal-title"
        aria-describedby="book-modal-desc"
        className="relative flex w-full max-h-[95vh] flex-col overflow-hidden rounded-t-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-2xl sm:max-h-[90vh] sm:max-w-2xl sm:rounded-lg md:max-w-3xl"
      >
        {/* Close button — absolute, stays visible over scrolled content */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={() => onCloseRef.current?.()}
          aria-label={dict?.common?.close ?? "Close"}
          className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))]/85 backdrop-blur-sm transition-colors hover:border-accent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Scrollable content area — cover + info stacked like an expanded card */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
          {/* Cover */}
          <div className="relative w-full h-56 bg-[hsl(var(--muted))] sm:h-72 md:h-80">
            {book.cover?.url ? (
              <Image
                src={book.cover.url}
                alt={book.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 672px, 768px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-6xl sm:text-7xl">
                {CATEGORY_EMOJI[book.category] || "📕"}
              </div>
            )}
            {/* Soft fade into the card for a premium feel */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[hsl(var(--card))]" />
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 p-5 sm:p-6 md:p-8">
            {/* Status */}
            <div>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  STATUS_COLOR[book.status] ??
                  "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
                }`}
              >
                {statusLabel[book.status] ?? book.status}
              </span>
            </div>

            {/* Title */}
            <h2
              id="book-modal-title"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {book.title}
            </h2>

            {/* Original title */}
            {book.originalTitle && (
              <p className="-mt-2 text-sm italic text-muted-foreground">
                {book.originalTitle}
              </p>
            )}

            {/* Author */}
            <p
              id="book-modal-desc"
              className="text-base text-[hsl(var(--foreground))]/90"
            >
              {book.author}
            </p>

            {/* Rating */}
            {book.rating ? (
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < book.rating
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                    aria-hidden="true"
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {book.rating}/5
                </span>
              </div>
            ) : null}

            {/* Meta grid */}
            <dl className="mt-1 grid grid-cols-1 gap-3 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 p-4 text-sm sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <Tag
                  className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    {dict?.books?.category_label ?? "Category"}
                  </dt>
                  <dd className="mt-0.5 font-medium break-words">
                    {categoryLabel}
                  </dd>
                </div>
              </div>

              {languageLabel && (
                <div className="flex items-start gap-2">
                  <Globe
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {dict?.books?.language_label ?? "Language"}
                    </dt>
                    <dd className="mt-0.5 font-medium break-words">
                      {languageLabel}
                    </dd>
                  </div>
                </div>
              )}

              {finishedStr && (
                <div className="flex items-start gap-2 sm:col-span-2">
                  <Calendar
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <dt className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                      {dict?.books?.finished_label ?? "Finished on"}
                    </dt>
                    <dd className="mt-0.5 font-medium break-words">
                      {finishedStr}
                    </dd>
                  </div>
                </div>
              )}
            </dl>

            {/* Notes */}
            {book.notes && (
              <div className="mt-1">
                <div className="mb-2 flex items-center gap-2">
                  <BookOpen
                    className="h-4 w-4 text-accent"
                    aria-hidden="true"
                  />
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    {dict?.books?.notes_label ?? "My notes"}
                  </h3>
                </div>
                <p className="whitespace-pre-line text-sm leading-relaxed text-[hsl(var(--foreground))]/90">
                  {book.notes}
                </p>
              </div>
            )}

            {/* External link */}
            {book.externalLink && (
              <a
                href={book.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-[hsl(var(--accent-foreground))] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-auto sm:self-start"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {dict?.books?.external_link ?? "More info"}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
