import {
  BlockquoteFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  UploadFeature,
} from "@payloadcms/richtext-lexical";
const LOCALES = ["it", "en", "bn"];

/** @type {import('payload').CollectionConfig} */
export const BlogPosts = {
  slug: "blog-posts",
  labels: { singular: "Blog Post", plural: "Blog Posts" },
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "category", "status", "publishedAt", "updatedAt"],
    description: "Gestione articoli blog per www.farhanabdullah.com",
    listSearchableFields: ["title"],
    livePreview: {
      url: ({ data }) => {
        const isDev = process.env.NODE_ENV === "development";
        const baseUrl = isDev
          ? "http://localhost:3000"
          : process.env.NEXT_PUBLIC_SERVER_URL ||
            "https://www.farhanabdullah.com";

        const lang = data?.locale || "it";
        const slug = data?.slug || "untitled";

        return `${baseUrl}/${lang}/blog/${slug}`;
      },
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true;
      return { status: { equals: "published" } };
    },
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
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      admin: {
        description: "~160 chars summary for cards and meta description",
      },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
      localized: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
          BlockquoteFeature(),
          LinkFeature({
            enabledCollections: ["blog-posts", "projects"],
          }),
          UploadFeature({
            collections: {
              media: {
                fields: [{ name: "caption", type: "text", localized: true }],
              },
            },
          }),
        ],
      }),
    },
    // ── SIDEBAR ──
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { position: "sidebar" },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      filterOptions: { type: { equals: "blog" } },
      admin: { position: "sidebar" },
    },
    {
      name: "tags",
      type: "array",
      admin: { position: "sidebar" },
      fields: [{ name: "tag", type: "text", required: true }],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "readingTime",
      type: "number",
      admin: { position: "sidebar", description: "Minutes (auto-calculated)" },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      admin: { position: "sidebar" },
    },
    // SEO
    {
      name: "seo",
      type: "group",
      fields: [
        { name: "metaTitle", type: "text", localized: true },
        { name: "metaDescription", type: "textarea", localized: true },
        { name: "ogImage", type: "upload", relationTo: "media" },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data?.content) {
          const text = JSON.stringify(data.content);
          const words = text.split(/\s+/).length;
          data.readingTime = Math.max(1, Math.ceil(words / 200));
        }
        if (data?.status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
    afterChange: [
      ({ doc }) => {
        const slug = doc?.slug;
        import("next/cache")
          .then(({ revalidatePath }) => {
            for (const locale of LOCALES) {
              revalidatePath(`/${locale}/blog`);
              if (slug) revalidatePath(`/${locale}/blog/${slug}`);
            }
          })
          .catch(() => {});
      },
    ],
  },
};
