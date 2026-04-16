import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';
import { searchPlugin } from '@payloadcms/plugin-search';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { s3Storage } from '@payloadcms/storage-s3';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { BlogPosts } from './collections/BlogPosts.js';
import { Books } from './collections/Books.js';
import { Categories } from './collections/Categories.js';
import { Media } from './collections/Media.js';
import { Projects } from './collections/Projects.js';
import { Users } from './collections/Users.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Cloud storage is only active when R2/S3 env vars are provided
const useCloudStorage =
  process.env.S3_BUCKET &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY &&
  process.env.S3_ENDPOINT;

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Farhan Portfolio CMS',
    },
  },

  localization: {
    locales: [
      { code: 'it', label: 'Italiano' },
      { code: 'en', label: 'English' },
      { code: 'bn', label: 'বাংলা (Bengali)' },
    ],
    defaultLocale: 'it',
    fallback: true,
  },

  collections: [Users, Media, Categories, Projects, Books, BlogPosts],

  editor: lexicalEditor({}),

  secret: process.env.PAYLOAD_SECRET || '',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

  sharp,

  cors: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'].filter(Boolean),

  upload: {
    limits: {
      fileSize: 10000000, // 10 MB
    },
  },

  plugins: [
    // ── SEO ──────────────────────────────────────────────────────────────────
    // Adds metaTitle, metaDescription, og image preview to Projects & BlogPosts
    seoPlugin({
      collections: ['projects', 'blog-posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${doc.title} | Farhan Abdullah`,
      generateDescription: ({ doc }) => doc.excerpt || doc.summary || '',
      generateURL: ({ doc, collectionConfig, locale }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
        const prefix = collectionConfig.slug === 'projects' ? 'projects' : 'blog';
        return `${base}/${locale}/${prefix}/${doc.slug}`;
      },
    }),

    // ── REDIRECTS ─────────────────────────────────────────────────────────────
    // Manage 301/302 redirects from the admin panel without redeploying
    redirectsPlugin({
      collections: ['projects', 'blog-posts'],
      overrides: {
        admin: { group: 'SEO & Navigation' },
      },
    }),

    // ── NESTED DOCS ───────────────────────────────────────────────────────────
    // Allows hierarchical documents (e.g. categories with sub-categories)
    nestedDocsPlugin({
      collections: ['categories'],
      generateLabel: (_, doc) => doc.title,
      generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
    }),

    // ── SEARCH ────────────────────────────────────────────────────────────────
    // Full-text search index across Projects, BlogPosts and Books
    searchPlugin({
      collections: ['projects', 'blog-posts', 'books'],
      defaultPriorities: {
        projects: 10,
        'blog-posts': 20,
        books: 30,
      },
      searchOverrides: {
        admin: { group: 'Content' },
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'slug',
            type: 'text',
            admin: { readOnly: true },
          },
          {
            name: 'category',
            type: 'text',
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

    // ── FORM BUILDER ─────────────────────────────────────────────────────────
    // Drag-and-drop form builder from the admin panel
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: false,
        country: false,
        checkbox: true,
        number: true,
        message: true,
        payment: false,
      },
      formOverrides: {
        admin: { group: 'Forms' },
      },
      formSubmissionOverrides: {
        admin: { group: 'Forms' },
      },
    }),

    // ── CLOUD STORAGE (Cloudflare R2 / S3) ───────────────────────────────────
    // Only activates when S3_BUCKET + credentials are in .env.local
    // Compatible with Cloudflare R2 (S3-compatible API)
    ...(useCloudStorage
      ? [
          s3Storage({
            collections: {
              media: {
                prefix: 'media',
                generateFileURL: ({ prefix, filename: fname }) =>
                  `${process.env.S3_PUBLIC_URL}/${prefix}/${fname}`,
              },
            },
            bucket: process.env.S3_BUCKET || '',
            config: {
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
              region: process.env.S3_REGION || 'auto',
              endpoint: process.env.S3_ENDPOINT || '',
            },
          }),
        ]
      : []),
  ],
});
