/** @type {import('payload').CollectionConfig} */
export const Books = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'author', 'category', 'status', 'rating'],
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'originalTitle',
      type: 'text',
      admin: {
        description: 'Original title in its native language (e.g. Bengali/Arabic)',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Bengali Classics', value: 'bengali_classics' },
        { label: 'Sirah (Prophet Biography)', value: 'sirah' },
        { label: 'Islamic History', value: 'islamic_history' },
        { label: 'Islamic Sciences', value: 'islamic_sciences' },
        { label: 'Spirituality', value: 'spirituality' },
        { label: 'Productivity', value: 'productivity' },
      ],
    },
    {
      name: 'language',
      type: 'select',
      required: true,
      defaultValue: 'bn',
      options: [
        { label: 'Bengali', value: 'bn' },
        { label: 'English', value: 'en' },
        { label: 'Italian', value: 'it' },
        { label: 'Arabic', value: 'ar' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'read',
      options: [
        { label: 'Read', value: 'read' },
        { label: 'Currently Reading', value: 'reading' },
        { label: 'Want to Read', value: 'wishlist' },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        step: 1,
        description: '1–5 stars',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Personal reflection / key takeaways',
      },
    },
    {
      name: 'finishedAt',
      type: 'date',
      admin: { date: { pickerAppearance: 'monthOnly' } },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      name: 'externalLink',
      type: 'text',
      admin: { description: 'Amazon / Goodreads URL (optional)' },
    },
  ],
};
