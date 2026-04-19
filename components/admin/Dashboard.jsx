"use client";

import { useEffect, useState } from "react";

const TEAL = "#00d4aa";

const COLLECTIONS = [
  {
    label: "Progetti",
    href: "/admin/collections/projects",
    desc: "Case study e portfolio",
    color: TEAL,
  },
  {
    label: "Blog Post",
    href: "/admin/collections/blog-posts",
    desc: "Articoli e guide tecniche",
    color: "#60a5fa",
  },
  {
    label: "Libri",
    href: "/admin/collections/books",
    desc: "Letture consigliate",
    color: "#a78bfa",
  },
  {
    label: "Media",
    href: "/admin/collections/media",
    desc: "Immagini e file",
    color: "#fb923c",
  },
  {
    label: "Categorie",
    href: "/admin/collections/categories",
    desc: "Tag e classificazioni",
    color: "#f472b6",
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    blogPosts: 0,
    books: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, blogRes, bookRes, msgRes] = await Promise.all([
          fetch("/api/projects?limit=1"),
          fetch("/api/blog-posts?limit=1"),
          fetch("/api/books?limit=1"),
          fetch("/api/contact-messages?where[status][equals]=new&limit=1"),
        ]);

        const [proj, blog, book, msg] = await Promise.all([
          projRes.json(),
          blogRes.json(),
          bookRes.json(),
          msgRes.json(),
        ]);

        setStats({
          projects: proj.totalDocs || 0,
          blogPosts: blog.totalDocs || 0,
          books: book.totalDocs || 0,
          unreadMessages: msg.totalDocs || 0,
        });
      } catch (err) {
        console.error("Errore caricamento stats dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <style>{`
        .adm-dash { min-height: 100vh; background: #f8fafc; color: #0f172a; font-family: Inter, system-ui, sans-serif; }
        .adm-banner { background: linear-gradient(135deg, #ffffff, #f1f5f9); border-bottom: 1px solid #e2e8f0; padding: 2rem 2rem 1.75rem; }
        .adm-badge { font-size: .62rem; font-weight: 700; letter-spacing: .1em; color: #00d4aa; background: rgba(0,212,170,.12); border: 1px solid rgba(0,212,170,.22); padding: 2px 10px; border-radius: 9999px; }
        .adm-h1 { font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 800; letter-spacing: -.03em; background: linear-gradient(120deg, #0f172a 20%, #00d4aa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .adm-sub { color: #64748b; margin-top: .4rem; font-size: .875rem; }
        .adm-site-btn { display: inline-flex; align-items: center; gap: .45rem; padding: .6rem 1rem; background: rgba(0,212,170,.12); border: 1px solid rgba(0,212,170,.22); border-radius: .75rem; color: #00d4aa; font-weight: 600; text-decoration: none; transition: all .15s; }
        .adm-site-btn:hover { background: rgba(0,212,170,.2); transform: translateY(-1px); }
        .adm-body { max-width: 1280px; margin: 0 auto; padding: 2rem; }
        .adm-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: .875rem; margin-bottom: 2.5rem; }
        .adm-stat { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1.1rem; padding: 1.25rem 1.5rem; text-decoration: none; color: inherit; transition: all .2s; }
        .adm-stat:hover { transform: translateY(-2px); border-color: #00d4aa; }
        .adm-stat-label { font-size: .62rem; font-weight: 700; letter-spacing: .08em; color: #64748b; text-transform: uppercase; }
        .adm-stat-value { font-size: 2.25rem; font-weight: 800; color: #0f172a; margin: .35rem 0; }
        .adm-section-header { display: flex; align-items: center; gap: .75rem; margin-bottom: 1rem; }
        .adm-section-label { font-size: .62rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #64748b; }
        .adm-section-line { flex: 1; height: 1px; background: #e2e8f0; }
        .adm-cols { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: .875rem; }
        .adm-col { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 1.1rem; padding: 1.25rem; text-decoration: none; color: inherit; display: flex; flex-direction: column; gap: .65rem; transition: all .2s; }
        .adm-col:hover { transform: translateY(-2px); border-color: #00d4aa; }
        .adm-col-name { font-weight: 700; font-size: .95rem; }
        .adm-col-desc { font-size: .8rem; color: #64748b; line-height: 1.4; }
      `}</style>

      <div className="adm-dash">
        <div className="adm-banner">
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1.25rem",
            }}
          >
            <div>
              <span className="adm-badge">Panel</span>
              <h1 className="adm-h1">Ciao, Farhan 👋</h1>
              <p className="adm-sub">Gestisci i contenuti del tuo portfolio</p>
            </div>
            <a
              href="https://www.farhanabdullah.com"
              target="_blank"
              rel="noopener noreferrer"
              className="adm-site-btn"
            >
              Vai al sito
            </a>
          </div>
        </div>

        <div className="adm-body">
          {/* Stats Live */}
          <div className="adm-stats">
            <a href="/admin/collections/projects" className="adm-stat">
              <div className="adm-stat-label">Progetti</div>
              <div className="adm-stat-value" style={{ color: TEAL }}>
                {loading ? "—" : stats.projects}
              </div>
            </a>
            <a href="/admin/collections/blog-posts" className="adm-stat">
              <div className="adm-stat-label">Blog Post</div>
              <div className="adm-stat-value" style={{ color: "#60a5fa" }}>
                {loading ? "—" : stats.blogPosts}
              </div>
            </a>
            <a href="/admin/collections/books" className="adm-stat">
              <div className="adm-stat-label">Libri</div>
              <div className="adm-stat-value" style={{ color: "#a78bfa" }}>
                {loading ? "—" : stats.books}
              </div>
            </a>
            <a href="/admin/collections/contact-messages" className="adm-stat">
              <div className="adm-stat-label">Messaggi nuovi</div>
              <div className="adm-stat-value" style={{ color: "#f43f5e" }}>
                {loading ? "—" : stats.unreadMessages}
              </div>
            </a>
          </div>

          {/* Collections */}
          <div className="adm-section-header">
            <h2 className="adm-section-label">Collezioni</h2>
            <div className="adm-section-line" />
          </div>
          <div className="adm-cols">
            {COLLECTIONS.map((col) => (
              <a key={col.label} href={col.href} className="adm-col">
                <div
                  style={{
                    width: "2.25rem",
                    height: "2.25rem",
                    background: "#f1f5f9",
                    borderRadius: "0.65rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: col.color, fontSize: "1.4rem" }}>
                    📌
                  </span>
                </div>
                <div>
                  <p className="adm-col-name">{col.label}</p>
                  <p className="adm-col-desc">{col.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
