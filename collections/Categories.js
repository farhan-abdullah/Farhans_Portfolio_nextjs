/** @type {import('payload').CollectionConfig} */
export const Categories = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'type', 'slug'],
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
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'blog',
      options: [
        { label: 'Blog', value: 'blog' },
        { label: 'Project', value: 'project' },
        { label: 'Book', value: 'book' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color for badges (e.g. #7C3AED)',
      },
    },
  ],
};
