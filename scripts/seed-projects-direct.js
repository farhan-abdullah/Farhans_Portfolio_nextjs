#!/usr/bin/env node

/**
 * Simplified seed script to add professional projects to MongoDB directly
 * This bypasses Payload config complexity and connects directly to the database
 * Usage: node scripts/seed-projects-direct.js
 */

import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';

// Load environment variables from .env.local
function loadEnvFile() {
  const envPath = '.env.local';
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      }
    }
  }
}

loadEnvFile();

const MONGODB_URI = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/farhan_portfolio';
const DB_NAME = 'farhan_portfolio';
const COLLECTION = 'projects';

const projects = [
  {
    title: 'SBE ZONE',
    tagline: 'Enterprise Service Platform',
    summary: 'Full-stack web application for business service management and operations.',
    slug: 'sbe-zone',
    category: 'fullstack',
    status: 'live',
    featured: true,
    completedAt: new Date().toISOString().split('T')[0],
    stack: [
      { tech: 'React' },
      { tech: 'Node.js' },
      { tech: 'Express' },
      { tech: 'MongoDB' },
      { tech: 'Tailwind CSS' }
    ],
    links: {
      live: 'https://sbe-zone.com'
    },
    problem: {
      root: {
        type: 'block',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                text: 'The client needed a comprehensive platform to manage service requests, client data, and business operations across multiple teams.',
                type: 'text',
              }
            ]
          }
        ]
      }
    },
    solution: {
      root: {
        type: 'block',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                text: 'Built a full-stack MERN application with role-based access control, real-time updates, and an intuitive admin dashboard for service management.',
                type: 'text',
              }
            ]
          }
        ]
      }
    },
    outcome: {
      root: {
        type: 'block',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                text: 'Successfully deployed and now handling 100+ daily service requests with improved team coordination and client satisfaction.',
                type: 'text',
              }
            ]
          }
        ]
      }
    },
    myRole: 'Full-Stack Developer - Designed and implemented the entire platform from database schema to frontend UI.',
    duration: '6 months',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: 'A2Z Assistenza',
    tagline: 'Technical Support & Assistance Service',
    summary: 'Professional service website with portfolio, service listings, and client contact system.',
    slug: 'a2z-assistenza',
    category: 'frontend',
    status: 'live',
    featured: true,
    completedAt: new Date().toISOString().split('T')[0],
    stack: [
      { tech: 'React' },
      { tech: 'Next.js' },
      { tech: 'Tailwind CSS' },
      { tech: 'Node.js' },
      { tech: 'MongoDB' }
    ],
    links: {
      live: 'https://a2zassistenza.com'
    },
    problem: {
      root: {
        type: 'block',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                text: 'A local IT assistance company needed a modern, professional web presence to showcase services and attract new clients.',
                type: 'text',
              }
            ]
          }
        ]
      }
    },
    solution: {
      root: {
        type: 'block',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                text: 'Created a responsive, SEO-optimized website with service pages, portfolio section, contact forms, and integration with backend services.',
                type: 'text',
              }
            ]
          }
        ]
      }
    },
    outcome: {
      root: {
        type: 'block',
        version: 1,
        children: [
          {
            type: 'paragraph',
            version: 1,
            children: [
              {
                text: 'Increased client inquiries by 40% and improved online visibility through SEO optimization and modern design.',
                type: 'text',
              }
            ]
          }
        ]
      }
    },
    myRole: 'Frontend Developer - Designed and developed the entire website with focus on user experience and SEO.',
    duration: '4 months',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

async function seedProjects() {
  const client = new MongoClient(MONGODB_URI);

  try {
    console.log('🌱 Connecting to MongoDB...');
    await client.connect();

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION);

    console.log('📝 Adding projects...\n');

    for (const project of projects) {
      // Check if project already exists
      const existing = await collection.findOne({ slug: project.slug });

      if (existing) {
        console.log(`⏭️  Project "${project.title}" already exists. Skipping...`);
        continue;
      }

      try {
        const result = await collection.insertOne(project);
        console.log(`✅ Created: ${project.title} (ID: ${result.insertedId})`);
      } catch (error) {
        console.error(`❌ Error creating project "${project.title}":`, error.message);
      }
    }

    console.log('\n✨ Done! Projects have been added to MongoDB.');
    console.log('📸 Note: You may need to add cover images and gallery photos via the admin panel.');
    console.log('🔗 Admin panel: http://localhost:3000/admin');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedProjects();
