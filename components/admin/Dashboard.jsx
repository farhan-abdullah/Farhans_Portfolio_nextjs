"use client";

import React from "react";
import Link from "next/link";
import {
  Globe,
  ArrowUpRight,
  TrendingUp,
  Cloud,
  ArrowRight,
  Briefcase,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Tags,
  Pencil,
  Upload,
  Check,
  Plus,
  GitBranch,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="dashboard-custom-wrapper pb-10">
      {/* ── BANNER ── */}
      <div className="dash-banner">
        <div className="dash-banner-inner">
          <div>
            <span className="dash-badge">Panel</span>
            <h1 className="dash-h1">Ciao, Farhan</h1>
            <p className="dash-sub">Gestisci i contenuti del tuo portfolio</p>
          </div>
          <a
            href="https://www.farhanabdullah.com"
            target="_blank"
            rel="noopener noreferrer"
            className="site-btn"
          >
            <Globe style={{ width: 14, height: 14 }} />
            View live site
            <ArrowUpRight style={{ width: 12, height: 12 }} />
          </a>
        </div>
      </div>

      <div className="dash-body">
        {/* ── STATISTICHE ── */}
        <div className="dash-stats">
          <div className="stat">
            <div className="stat-bar" style={{ background: "var(--adm-accent)" }}></div>
            <p className="stat-label">Projects</p>
            <p className="stat-value" style={{ color: "var(--adm-accent)" }}>12</p>
            <p className="stat-note">8 live · 3 WIP · 1 archived</p>
            <p className="stat-trend">
              <TrendingUp style={{ width: 11, height: 11 }} />+2 this month
            </p>
          </div>
          <div className="stat">
            <div className="stat-bar" style={{ background: "var(--adm-blue)" }}></div>
            <p className="stat-label">Blog Posts</p>
            <p className="stat-value" style={{ color: "var(--adm-blue)" }}>24</p>
            <p className="stat-note">19 published · 5 drafts</p>
            <p className="stat-trend">
              <TrendingUp style={{ width: 11, height: 11 }} />+4 this month
            </p>
          </div>
          <div className="stat">
            <div className="stat-bar" style={{ background: "var(--adm-violet)" }}></div>
            <p className="stat-label">Books</p>
            <p className="stat-value" style={{ color: "var(--adm-violet)" }}>47</p>
            <p className="stat-note">22 read · 6 reading · 19 wishlist</p>
            <p className="stat-trend">
              <TrendingUp style={{ width: 11, height: 11 }} />+3 this month
            </p>
          </div>
          <div className="stat">
            <div className="stat-bar" style={{ background: "var(--adm-orange)" }}></div>
            <p className="stat-label">Media</p>
            <p className="stat-value" style={{ color: "var(--adm-orange)" }}>163</p>
            <p className="stat-note">287 MB of 10 GB</p>
            <p className="stat-trend" style={{ color: "var(--adm-muted)" }}>
              <Cloud style={{ width: 11, height: 11 }} /> Cloudflare R2
            </p>
          </div>
        </div>

        {/* ── COLLEZIONI ── */}
        <div className="section-head">
          <h2 className="section-label">Collections</h2>
          <div className="section-line"></div>
        </div>
        <div className="dash-cols">
          <Link href="/admin/collections/projects" className="coll-card">
            <div className="coll-icon">
              <Briefcase style={{ width: 18, height: 18, color: "var(--adm-accent)" }} />
            </div>
            <div>
              <div className="coll-name">Projects</div>
              <div className="coll-desc">Case studies &amp; portfolio work</div>
            </div>
            <span className="coll-link">Open <ArrowRight style={{ width: 11, height: 11 }} /></span>
          </Link>

          <Link href="/admin/collections/blog-posts" className="coll-card">
            <div className="coll-icon">
              <FileText style={{ width: 18, height: 18, color: "var(--adm-blue)" }} />
            </div>
            <div>
              <div className="coll-name">Blog Posts</div>
              <div className="coll-desc">Articles &amp; technical guides</div>
            </div>
            <span className="coll-link">Open <ArrowRight style={{ width: 11, height: 11 }} /></span>
          </Link>

          <Link href="/admin/collections/books" className="coll-card">
            <div className="coll-icon">
              <BookOpen style={{ width: 18, height: 18, color: "var(--adm-violet)" }} />
            </div>
            <div>
              <div className="coll-name">Books</div>
              <div className="coll-desc">My library &amp; reading list</div>
            </div>
            <span className="coll-link">Open <ArrowRight style={{ width: 11, height: 11 }} /></span>
          </Link>

          <Link href="/admin/collections/media" className="coll-card">
            <div className="coll-icon">
              <ImageIcon style={{ width: 18, height: 18, color: "var(--adm-orange)" }} />
            </div>
            <div>
              <div className="coll-name">Media</div>
              <div className="coll-desc">Images &amp; uploads</div>
            </div>
            <span className="coll-link">Open <ArrowRight style={{ width: 11, height: 11 }} /></span>
          </Link>

          <Link href="/admin/collections/categories" className="coll-card">
            <div className="coll-icon">
              <Tags style={{ width: 18, height: 18, color: "var(--adm-pink)" }} />
            </div>
            <div>
              <div className="coll-name">Categories</div>
              <div className="coll-desc">Tags &amp; taxonomies</div>
            </div>
            <span className="coll-link">Open <ArrowRight style={{ width: 11, height: 11 }} /></span>
          </Link>
        </div>

        {/* ── PANNELLI INFERIORI ── */}
        <div className="dash-row">
          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Recent activity</div>
            </div>
            <div className="panel-body">
              <div className="activity-item">
                <div className="activity-dot">
                  <Pencil style={{ width: 13, height: 13, color: "var(--adm-accent)" }} />
                </div>
                <div className="activity-main">
                  <div className="activity-line">
                    <span className="em">Bistro Boss</span>{" "}
                    <span className="mu">was updated</span>
                  </div>
                  <div className="activity-time">2 min ago · autosave</div>
                </div>
                <span className="activity-badge" style={{ color: "var(--adm-accent)", background: "var(--adm-accent-soft)" }}>Projects</span>
              </div>
              <div className="activity-item">
                <div className="activity-dot">
                  <Upload style={{ width: 13, height: 13, color: "var(--adm-orange)" }} />
                </div>
                <div className="activity-main">
                  <div className="activity-line">
                    <span className="mu">Uploaded</span>{" "}
                    <span className="em">cover.jpg</span>
                  </div>
                  <div className="activity-time">14 min ago</div>
                </div>
                <span className="activity-badge" style={{ color: "var(--adm-orange)", background: "rgba(251,146,60,.1)" }}>Media</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <div className="panel-title">Quick actions</div>
            </div>
            <div className="quick-list">
              <Link href="/admin/collections/projects/create" className="quick-item">
                <div className="i" style={{ color: "var(--adm-accent)" }}>
                  <Plus style={{ width: 14, height: 14 }} />
                </div>
                <div>
                  <div className="t">New Project</div>
                  <div className="s">Case study with tabs</div>
                </div>
              </Link>
              <Link href="/admin/collections/blog-posts/create" className="quick-item">
                <div className="i" style={{ color: "var(--adm-blue)" }}>
                  <Pencil style={{ width: 14, height: 14 }} />
                </div>
                <div>
                  <div className="t">Write a blog post</div>
                  <div className="s">Rich text · Lexical</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <div className="dash-footer">
          <div className="l">Farhan Abdullah · Portfolio CMS</div>
          <div className="r">Payload 3.0 · Next.js 15 · MongoDB · Cloudflare R2</div>
        </div>
      </div>
    </div>
  );
}