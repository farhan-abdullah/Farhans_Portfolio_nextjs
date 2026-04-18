import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import { nestedDocsPlugin } from "@payloadcms/plugin-nested-docs";
import { redirectsPlugin } from "@payloadcms/plugin-redirects";
import { searchPlugin } from "@payloadcms/plugin-search";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { BlogPosts } from "./collections/BlogPosts.js";
import { Books } from "./collections/Books.js";
import { Categories } from "./collections/Categories.js";
import { Media } from "./collections/Media.js";
import { Projects } from "./collections/Projects.js";
import { Users } from "./collections/Users.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Resend adapter è attivo solo se RESEND_API_KEY è presente.
// Usato da Payload per mail transazionali (es. reset password admin).
// Senza adapter Payload logga solo in console.
const useResend = !!process.env.RESEND_API_KEY;

console.log("[R2 config]", {
  S3_BUCKET:            process.env.S3_BUCKET            ? `"${process.env.S3_BUCKET}"` : "MISSING",
  S3_ENDPOINT:          process.env.S3_ENDPOINT          ? `"${process.env.S3_ENDPOINT}"` : "MISSING",
  S3_PUBLIC_URL:        process.env.S3_PUBLIC_URL        ? `"${process.env.S3_PUBLIC_URL}"` : "MISSING",
  S3_REGION:            process.env.S3_REGION            || "auto (default)",
  S3_ACCESS_KEY_ID:     process.env.S3_ACCESS_KEY_ID     ? "***SET***" : "MISSING",
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY ? "***SET***" : "MISSING",
});

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " | Farhan Admin",
    },
    // Admin custom con Tailwind (versione stabile)
    components: {
      graphics: {
        Logo: "@/components/admin/Logo",
        Icon: "@/components/admin/Logo",
      },
      views: {
        Dashboard: "@/components/admin/Dashboard",
      },
    },
    theme: "dark",
    css: path.resolve(dirname, "admin-custom.css"),
  },
  localization: {
    locales: [
      { code: "it", label: "Italiano" },
      { code: "en", label: "English" },
      { code: "bn", label: "বাংলা (Bengali)" },
    ],
    defaultLocale: "en",
    fallback: true,
  },

  collections: [Users, Media, Categories, Projects, Books, BlogPosts],

  editor: lexicalEditor({}),

  secret: process.env.PAYLOAD_SECRET || "",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),

  // ── EMAIL ────────────────────────────────────────────────────────────────
  // Mail transazionali (reset password, notifiche admin).
  // In dev senza RESEND_API_KEY, Payload logga solo in console.
  ...(useResend
    ? {
        email: resendAdapter({
          defaultFromAddress:
            process.env.RESEND_FROM_ADDRESS || "noreply@farhanabdullah.com",
          defaultFromName: process.env.RESEND_FROM_NAME || "Farhan Abdullah",
          apiKey: process.env.RESEND_API_KEY,
        }),
      }
    : {}),

  sharp,

  cors: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"].filter(
    Boolean,
  ),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"].filter(
    Boolean,
  ),

  upload: {
    limits: {
      fileSize: 10000000, // 10 MB
    },
  },

  plugins: [
    // ── SEO ──────────────────────────────────────────────────────────────────
    // Adds metaTitle, metaDescription, og image preview to Projects & BlogPosts
    seoPlugin({
      collections: ["projects", "blog-posts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => `${doc.title} | Farhan Abdullah`,
      generateDescription: ({ doc }) => doc.excerpt || doc.summary || "",
      generateURL: ({ doc, collectionConfig, locale }) => {
        const base =
          process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
        const prefix =
          collectionConfig.slug === "projects" ? "projects" : "blog";
        return `${base}/${locale}/${prefix}/${doc.slug}`;
      },
    }),

    // ── REDIRECTS ─────────────────────────────────────────────────────────────
    // Manage 301/302 redirects from the admin panel without redeploying
    redirectsPlugin({
      collections: ["projects", "blog-posts"],
      overrides: {
        admin: { group: "SEO & Navigation" },
      },
    }),

    // ── NESTED DOCS ───────────────────────────────────────────────────────────
    // Allows hierarchical documents (e.g. categories with sub-categories)
    nestedDocsPlugin({
      collections: ["categories"],
      generateLabel: (_, doc) => doc.title,
      generateURL: (docs) =>
        docs.reduce((url, doc) => `${url}/${doc.slug}`, ""),
    }),

    // ── SEARCH ────────────────────────────────────────────────────────────────
    // Full-text search index across Projects, BlogPosts and Books
    searchPlugin({
      collections: ["projects", "blog-posts", "books"],
      defaultPriorities: {
        projects: 10,
        "blog-posts": 20,
        books: 30,
      },
      searchOverrides: {
        admin: { group: "Content" },
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: "slug",
            type: "text",
            admin: { readOnly: true },
          },
          {
            name: "category",
            type: "text",
            admin: { readOnly: true },
          },
        ],
      },
      beforeSync: ({ originalDoc, searchDoc }) => ({
        ...searchDoc,
        slug: originalDoc.slug,
        category: originalDoc.category,
      }),
    }),

    // ── CLOUD STORAGE (Cloudflare R2 / S3-compatible) ───────────────────────
    // Vercel filesystem is read-only — uploads go to Cloudflare R2.
    // Required env vars: S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY,
    //                    S3_ENDPOINT, S3_PUBLIC_URL, S3_REGION (default "auto")
    s3Storage({
      collections: {
        media: {
          prefix: "media",
          generateFileURL: ({ prefix, filename }) =>
            `${process.env.S3_PUBLIC_URL}/${prefix}/${filename}`,
        },
      },
      bucket: process.env.S3_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
        region: process.env.S3_REGION || "auto",
        endpoint: process.env.S3_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
});
// add a comment
