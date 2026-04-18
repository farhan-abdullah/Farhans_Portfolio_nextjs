'use client';

const TEAL = '#00d4aa';
const TEAL_DIM = 'rgba(0,212,170,0.12)';
const TEAL_BORDER = 'rgba(0,212,170,0.22)';

const BG_PAGE   = 'hsl(222 47% 5%)';
const BG_CARD   = 'hsl(222 47% 8%)';
const BG_HOVER  = 'hsl(217 33% 12%)';
const BORDER    = 'hsl(217 33% 16%)';
const TEXT      = 'hsl(210 40% 98%)';
const MUTED     = 'hsl(215 20% 55%)';

const COLLECTIONS = [
  {
    label: 'Progetti',
    href: '/admin/collections/projects',
    desc: 'Case study e portfolio',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    label: 'Blog Post',
    href: '/admin/collections/blog-posts',
    desc: 'Articoli e guide tecniche',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    label: 'Libri',
    href: '/admin/collections/books',
    desc: 'Letture consigliate',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
      </svg>
    ),
  },
  {
    label: 'Media',
    href: '/admin/collections/media',
    desc: 'Immagini e file',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
  },
  {
    label: 'Categorie',
    href: '/admin/collections/categories',
    desc: 'Tag e classificazioni',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
];

const STATS = [
  { label: 'Progetti live', value: '—', note: 'vai a Progetti', href: '/admin/collections/projects', color: TEAL },
  { label: 'Blog pubblicati', value: '—', note: 'vai al Blog', href: '/admin/collections/blog-posts', color: '#60a5fa' },
  { label: 'Libri', value: '—', note: 'vai ai Libri', href: '/admin/collections/books', color: '#a78bfa' },
  { label: 'File media', value: '—', note: 'vai a Media', href: '/admin/collections/media', color: '#fb923c' },
];

export default function Dashboard() {
  return (
    <div style={{ minHeight: '100vh', background: BG_PAGE, color: TEXT, fontFamily: 'Inter, system-ui, sans-serif', padding: '0' }}>

      {/* Top banner */}
      <div style={{ background: `linear-gradient(135deg, hsl(222 47% 8%) 0%, hsl(222 47% 10%) 100%)`, borderBottom: `1px solid ${BORDER}`, padding: '2.5rem 2.5rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', color: TEAL, textTransform: 'uppercase', background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}`, padding: '2px 10px', borderRadius: '9999px' }}>
                Panel
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0, background: `linear-gradient(120deg, ${TEXT} 20%, ${TEAL} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Ciao, Farhan 👋
            </h1>
            <p style={{ color: MUTED, marginTop: '0.4rem', fontSize: '0.95rem', fontWeight: 400 }}>
              Gestisci i contenuti del tuo portfolio
            </p>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.55rem 1.1rem', background: TEAL_DIM, border: `1px solid ${TEAL_BORDER}`, borderRadius: '0.75rem', color: TEAL, fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            Vai al sito
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </a>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem' }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {STATS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              style={{ background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: '1.25rem', padding: '1.5rem 1.75rem', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'all 0.2s', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: s.color, opacity: 0.6 }} />
              <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', color: MUTED, textTransform: 'uppercase', marginBottom: '0.75rem' }}>{s.label}</p>
              <p style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: s.color, marginBottom: '0.5rem' }}>{s.value}</p>
              <p style={{ fontSize: '0.75rem', color: MUTED }}>{s.note}</p>
            </a>
          ))}
        </div>

        {/* Collections section */}
        <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h2 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: MUTED, margin: 0 }}>
            Collezioni
          </h2>
          <div style={{ flex: 1, height: '1px', background: BORDER }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1rem' }}>
          {COLLECTIONS.map((col) => (
            <a
              key={col.label}
              href={col.href}
              style={{ background: BG_CARD, border: `1px solid ${BORDER}`, borderRadius: '1.25rem', padding: '1.5rem', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '0.75rem', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = BG_HOVER; e.currentTarget.style.borderColor = 'hsl(217 33% 22%)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = BG_CARD; e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ width: '2.5rem', height: '2.5rem', background: BG_HOVER, border: `1px solid ${BORDER}`, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {col.icon}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.2rem' }}>{col.label}</p>
                <p style={{ fontSize: '0.8rem', color: MUTED, lineHeight: 1.4 }}>{col.desc}</p>
              </div>
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: TEAL, fontWeight: 600 }}>
                Apri
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Footer note */}
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: `1px solid ${BORDER}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.78rem', color: MUTED }}>
            Farhan Abdullah · Portfolio CMS
          </p>
          <p style={{ fontSize: '0.78rem', color: 'hsl(217 33% 30%)' }}>
            Payload CMS · Next.js · MongoDB
          </p>
        </div>

      </div>
    </div>
  );
}
