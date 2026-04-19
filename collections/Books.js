/** @type {import('payload').CollectionConfig} */
export const Books = {
  slug: "books",
  labels: {
    singular: "Book",
    plural: "Books",
  },
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: [
      "title",
      "author",
      "category",
      "status",
      "rating",
      "finishedAt",
    ],
    description:
      "Manage your personal book collection and reading progress for www.farhanabdullah.com",
    listSearchableFields: ["title", "author", "originalTitle"],
  },
  access: {
    read: () => true, // Public on frontend
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  versions: {
    drafts: true,
    maxPerDoc: 10,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "originalTitle",
      type: "text",
      admin: {
        description:
          "Original title in its native language (e.g. Bengali, Arabic, Italian)",
      },
    },
    {
      name: "author",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Bengali Classics", value: "bengali_classics" },
        { label: "Sirah (Prophet Biography)", value: "sirah" },
        { label: "History & Civilization", value: "history_civilization" },
        { label: "Technology & Sciences", value: "sciences_technology" },
        { label: "Spirituality", value: "spirituality" },
        { label: "Productivity", value: "productivity" },
      ],
    },
    {
      name: "language",
      type: "select",
      required: true,
      defaultValue: "bn",
      options: [
        { label: "Bengali", value: "bn" },
        { label: "English", value: "en" },
        { label: "Italian", value: "it" },
        { label: "Arabic", value: "ar" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "read",
      options: [
        { label: "Read", value: "read" },
        { label: "Currently Reading", value: "reading" },
        { label: "Want to Read", value: "wishlist" },
      ],
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      admin: {
        step: 1,
        description: "Rate from 1 to 5 stars",
      },
    },
    {
      name: "finishedAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayOnly" }, // Full day/month/year format
        position: "sidebar",
        description: "Date when you finished reading this book",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "notes",
      type: "textarea",
      localized: true,
      admin: {
        description: "Personal reflection and key takeaways",
        rows: 6,
      },
    },
    {
      name: "externalLink",
      type: "text",
      admin: {
        description: "Amazon, Goodreads or other external URL (optional)",
      },
    },
  ],
  timestamps: true,
};
