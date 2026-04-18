const TEAL = '#00d4aa';

const COLLECTIONS = [
  {
    label: 'Progetti',
    href: '/admin/collections/projects',
    desc: 'Case study e portfolio',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${TEAL}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
  },
  {
    label: 'Blog Post',
    href: '/admin/collections/blog-posts',
    desc: 'Articoli e guide tecniche',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  },
  {
    label: 'Libri',
    href: '/admin/collections/books',
    desc: 'Letture consigliate',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  },
  {
    label: 'Media',
    href: '/admin/collections/media',
    desc: 'Immagini e file',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`,
  },
  {
    label: 'Categorie',
    href: '/admin/collections/categories',
    desc: 'Tag e classificazioni',
    icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  },
];

const STATS = [
  { label: 'Progetti', href: '/admin/collections/projects',   color: '#00d4aa' },
  { label: 'Blog',     href: '/admin/collections/blog-posts', color: '#60a5fa' },
  { label: 'Libri',    href: '/admin/collections/books',      color: '#a78bfa' },
  { label: 'Media',    href: '/admin/collections/media',      color: '#fb923c' },
];

export default function Dashboard() {
  return (
    <>
      <style>{`
        /* ── Base ── */
        .adm-dash {
          min-height: 100vh;
          background: hsl(222 47% 5%);
          color: hsl(210 40% 98%);
          font-family: Inter, system-ui, sans-serif;
        }

        /* ── Banner ── */
        .adm-banner {
          background: linear-gradient(135deg, hsl(222 47% 8%), hsl(222 47% 10%));
          border-bottom: 1px solid hsl(217 33% 16%);
          padding: 2rem 2rem 1.75rem;
        }
        .adm-banner-inner {
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1.25rem;
        }
        .adm-badge {
          font-size: .62rem;
          font-weight: 700;
          letter-spacing: .1em;
          color: #00d4aa;
          text-transform: uppercase;
          background: rgba(0,212,170,.12);
          border: 1px solid rgba(0,212,170,.22);
          padding: 2px 10px;
          border-radius: 9999px;
          display: inline-block;
          margin-bottom: .4rem;
        }
        .adm-h1 {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -.03em;
          margin: 0;
          background: linear-gradient(120deg, hsl(210 40% 98%) 20%, #00d4aa 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1.1;
        }
        .adm-sub {
          color: hsl(215 20% 55%);
          margin-top: .4rem;
          font-size: .875rem;
        }
        .adm-site-btn {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          padding: .6rem 1rem;
          background: rgba(0,212,170,.12);
          border: 1px solid rgba(0,212,170,.22);
          border-radius: .75rem;
          color: #00d4aa;
          font-size: .82rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          transition: background .15s;
          flex-shrink: 0;
        }
        .adm-site-btn:hover { background: rgba(0,212,170,.2); }

        /* ── Body ── */
        .adm-body {
          max-width: 1280px;
          margin: 0 auto;
          padding: 2rem;
        }

        /* ── Stats ── */
        .adm-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: .875rem;
          margin-bottom: 2.5rem;
        }
        .adm-stat {
          background: hsl(222 47% 8%);
          border: 1px solid hsl(217 33% 16%);
          border-radius: 1.1rem;
          padding: 1.25rem 1.5rem;
          text-decoration: none;
          color: inherit;
          display: block;
          position: relative;
          overflow: hidden;
          transition: transform .2s, border-color .2s;
        }
        .adm-stat:hover { transform: translateY(-2px); border-color: hsl(217 33% 22%); }
        .adm-stat-bar { position: absolute; top: 0; left: 0; right: 0; height: 2px; opacity: .7; }
        .adm-stat-label { font-size: .62rem; font-weight: 700; letter-spacing: .08em; color: hsl(215 20% 55%); text-transform: uppercase; margin-bottom: .5rem; }
        .adm-stat-value { font-size: 2rem; font-weight: 800; letter-spacing: -.04em; line-height: 1; margin-bottom: .35rem; }
        .adm-stat-note { font-size: .7rem; color: hsl(215 20% 55%); }

        /* ── Section header ── */
        .adm-section-header { display: flex; align-items: center; gap: .75rem; margin-bottom: 1rem; }
        .adm-section-label { font-size: .62rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: hsl(215 20% 55%); margin: 0; white-space: nowrap; }
        .adm-section-line { flex: 1; height: 1px; background: hsl(217 33% 16%); }

        /* ── Collection cards ── */
        .adm-cols {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: .875rem;
        }
        .adm-col {
          background: hsl(222 47% 8%);
          border: 1px solid hsl(217 33% 16%);
          border-radius: 1.1rem;
          padding: 1.25rem;
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          gap: .65rem;
          transition: transform .2s, background .15s, border-color .15s;
        }
        .adm-col:hover { transform: translateY(-2px); background: hsl(217 33% 12%); border-color: hsl(217 33% 22%); }
        .adm-col-icon {
          width: 2.25rem; height: 2.25rem;
          background: hsl(217 33% 12%);
          border: 1px solid hsl(217 33% 16%);
          border-radius: .65rem;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .adm-col-name { font-weight: 700; font-size: .9rem; margin-bottom: .15rem; }
        .adm-col-desc { font-size: .75rem; color: hsl(215 20% 55%); line-height: 1.4; }
        .adm-col-link { margin-top: auto; display: flex; align-items: center; gap: .3rem; font-size: .7rem; color: #00d4aa; font-weight: 600; }

        /* ── Footer ── */
        .adm-footer {
          margin-top: 2.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid hsl(217 33% 16%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: .5rem;
        }
        .adm-footer-l { font-size: .72rem; color: hsl(215 20% 55%); }
        .adm-footer-r { font-size: .72rem; color: hsl(217 33% 30%); }

        /* ── Tablet: ≤ 1024px ── */
        @media (max-width: 1024px) {
          .adm-cols { grid-template-columns: repeat(3, 1fr); }
        }

        /* ── Tablet small: ≤ 768px ── */
        @media (max-width: 768px) {
          .adm-banner { padding: 1.5rem 1.25rem 1.25rem; }
          .adm-body   { padding: 1.25rem; }

          .adm-stats { grid-template-columns: repeat(2, 1fr); gap: .75rem; margin-bottom: 2rem; }
          .adm-stat  { padding: 1rem 1.1rem; }
          .adm-stat-value { font-size: 1.75rem; }

          .adm-cols  { grid-template-columns: repeat(2, 1fr); gap: .75rem; }
        }

        /* ── Mobile: ≤ 480px ── */
        @media (max-width: 480px) {
          .adm-banner-inner { flex-direction: column; align-items: flex-start; gap: 1rem; }
          .adm-site-btn { width: 100%; justify-content: center; }

          .adm-stats { grid-template-columns: repeat(2, 1fr); }
          .adm-stat-value { font-size: 1.5rem; }

          .adm-cols  { grid-template-columns: 1fr 1fr; }

          .adm-footer { flex-direction: column; align-items: flex-start; gap: .25rem; }
        }
      `}</style>

      <div className="adm-dash">
        {/* Banner */}
        <div className="adm-banner">
          <div className="adm-banner-inner">
            <div>
              <span className="adm-badge">Panel</span>
              <h1 className="adm-h1">Ciao, Farhan 👋</h1>
              <p className="adm-sub">Gestisci i contenuti del tuo portfolio</p>
            </div>
            <a href="/" target="_blank" rel="noopener noreferrer" className="adm-site-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              Vai al sito
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="adm-body">
          {/* Stats */}
          <div className="adm-stats">
            {STATS.map((s) => (
              <a key={s.label} href={s.href} className="adm-stat">
                <div className="adm-stat-bar" style={{ background: s.color }} />
                <p className="adm-stat-label">{s.label}</p>
                <p className="adm-stat-value" style={{ color: s.color }}>—</p>
                <p className="adm-stat-note">vai alla collezione →</p>
              </a>
            ))}
          </div>

          {/* Collections */}
          <div className="adm-section-header">
            <h2 className="adm-section-label">Collezioni</h2>
            <div className="adm-section-line" />
          </div>
          <div className="adm-cols">
            {COLLECTIONS.map((col) => (
              <a key={col.label} href={col.href} className="adm-col">
                <div className="adm-col-icon" dangerouslySetInnerHTML={{ __html: col.icon }} />
                <div>
                  <p className="adm-col-name">{col.label}</p>
                  <p className="adm-col-desc">{col.desc}</p>
                </div>
                <span className="adm-col-link">
                  Apri
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="adm-footer">
            <p className="adm-footer-l">Farhan Abdullah · Portfolio CMS</p>
            <p className="adm-footer-r">Payload CMS · Next.js · MongoDB</p>
          </div>
        </div>
      </div>
    </>
  );
}
