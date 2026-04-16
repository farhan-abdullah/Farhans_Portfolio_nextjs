/** @type {import('payload').CollectionConfig} */
export const Media = {
  slug: 'media',
  admin: {
    group: 'Admin',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'feature', width: 1200, height: 630, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre', fit: 'cover' },
    ],
    adminThumbnail: 'thumbnail',
    formatOptions: {
      format: 'webp',
      options: { quality: 85 },
    },
  },
};
