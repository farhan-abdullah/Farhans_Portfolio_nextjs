// collections/ContactMessages.js
import { CollectionConfig } from 'payload/types';

const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Messaggio di Contatto',
    plural: 'Messaggi di Contatto',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    group: 'Contatti',
    listSearchableFields: ['name', 'email', 'subject', 'message'],
    description: 'Tutti i messaggi ricevuti dal form di contatto del sito www.farhanabdullah.com',
  },
  access: {
    // Chiunque può creare (dal form frontend)
    create: () => true,
    // Solo admin loggato può vedere/modificare/cancellare
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Nome e Cognome',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefono (opzionale)',
      required: false,
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Oggetto',
      required: false,
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Messaggio',
      required: true,
      admin: {
        rows: 8,
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Stato',
      defaultValue: 'new',
      options: [
        { label: '🟡 Nuovo', value: 'new' },
        { label: '👀 Letto', value: 'read' },
        { label: '✅ Risposto', value: 'replied' },
        { label: '📦 Archiviato', value: 'archived' },
      ],
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Note Amministratore',
      admin: {
        description: 'Note private solo per te',
        rows: 4,
      },
    },
  ],
  timestamps: true,
};

export default ContactMessages;