import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
} from '@payloadcms/richtext-lexical';

/** @type {import('payload').CollectionConfig} */
export const Projects = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'category', 'status', 'featured', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
    },
    maxPerDoc: 20,
  },
  fields: [
    // ──────────────────────────────────────────
    // TABS
    // ──────────────────────────────────────────
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              admin: {
                description: 'One-liner shown on cards and hero (max ~90 chars)',
              },
            },
            {
              name: 'summary',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'Short description for project card (2-3 lines)',
              },
            },
            {
              name: 'cover',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Image', plural: 'Gallery' },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
                {
                  name: 'caption',
                  type: 'text',
                  localized: true,
                },
              ],
            },
          ],
        },
        // ── Case Study ──
        {
          label: 'Case Study',
          fields: [
            {
              name: 'problem',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => [
                  ...defaultFeatures,
                  HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                ],
              }),
              admin: { description: 'What was the problem / challenge?' },
            },
            {
              name: 'solution',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({}),
              admin: { description: 'How did you solve it?' },
            },
            {
              name: 'outcome',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({}),
              admin: { description: 'Results, metrics, impact' },
            },
            {
              name: 'metrics',
              type: 'array',
              labels: { singular: 'Metric', plural: 'Metrics' },
              fields: [
                { name: 'label', type: 'text', required: true, localized: true },
                { name: 'value', type: 'text', required: true },
                { name: 'description', type: 'text', localized: true },
              ],
            },
            {
              name: 'myRole',
              type: 'textarea',
              localized: true,
              admin: { description: 'Your specific contribution / role' },
            },
            {
              name: 'duration',
              type: 'text',
              admin: { description: 'e.g. "3 months", "Q2 2024 — Q4 2024"' },
            },
          ],
        },
      ],
    },

    // ──────────────────────────────────────────
    // SIDEBAR
    // ──────────────────────────────────────────
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL slug (e.g. "tiger-tech-redesign")',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Full-Stack', value: 'fullstack' },
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Multilingual', value: 'multilingual' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'stack',
      type: 'array',
      admin: {
        position: 'sidebar',
        description: 'Tech stack (React, Node.js, MongoDB, etc.)',
      },
      fields: [{ name: 'tech', type: 'text', required: true }],
    },
    {
      name: 'links',
      type: 'group',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'live', type: 'text', admin: { description: 'Live URL' } },
        { name: 'github', type: 'text', admin: { description: 'GitHub URL' } },
        { name: 'figma', type: 'text' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'live',
      options: [
        { label: 'Live', value: 'live' },
        { label: 'In Progress', value: 'wip' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'completedAt',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'monthOnly' } },
    },
    // SEO
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'metaTitle', type: 'text', localized: true },
        { name: 'metaDescription', type: 'textarea', localized: true },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
  name: 'TechStackField',
  type: 'array',
  label: 'Tech Stack',
  fields: [{ name: 'technology', type: 'text' }],
  admin: {
    components: {
      Field: () => import('@/components/admin/TechStackField'),
    },
  },
},
{
  name: 'results',
  type: 'array',
  label: 'Risultati ottenuti',
  fields: [
    { name: 'metric', type: 'text' },
    { name: 'value',  type: 'text' },
  ],
  admin: {
    components: {
      Field: () => import('@/components/admin/ResultsField'),
    },
  },
},
{
  name: 'hero',
  type: 'group',
  label: 'Hero Images',
  fields: [
    {
      name: 'desktop',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine Desktop',
    },
    {
      name: 'mobile',
      type: 'upload',
      relationTo: 'media',
      label: 'Immagine Mobile',
    },
  ],
  admin: {
    components: {
      Field: () => import('@/components/admin/ImagePreviewField'),
    },
  },
},

  ],
};
