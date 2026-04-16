#!/usr/bin/env node

/**
 * Seed script to add professional projects to Payload CMS
 * Usage: node scripts/seed-projects.js
 */

import { getPayload } from 'payload';
import config from '../payload.config.js';

const projects = [
  {
    // SBE ZONE - Web App
    en: {
      title: 'SBE ZONE',
      tagline: 'Enterprise Service Platform',
      summary: 'Full-stack web application for business service management and operations.',
      slug: 'sbe-zone',
      category: 'fullstack',
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
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
      links: {
        live: 'https://sbe-zone.com'
      }
    },
    it: {
      title: 'SBE ZONE',
      tagline: 'Piattaforma di Servizi Aziendali',
      summary: 'Applicazione web full-stack per la gestione dei servizi aziendali e delle operazioni.',
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
                  text: 'Il cliente aveva bisogno di una piattaforma completa per gestire le richieste di servizio, i dati dei clienti e le operazioni aziendali su più team.',
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
                  text: 'Ho creato un\'applicazione MERN full-stack con controllo d\'accesso basato sui ruoli, aggiornamenti in tempo reale e una dashboard admin intuitiva.',
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
                  text: 'Implementata con successo e ora gestisce 100+ richieste di servizio giornaliere con migliore coordinamento del team e soddisfazione dei clienti.',
                  type: 'text',
                }
              ]
            }
          ]
        }
      },
      myRole: 'Full-Stack Developer - Ho progettato e implementato l\'intera piattaforma dal schema del database all\'interfaccia frontend.'
    },
    bn: {
      title: 'SBE ZONE',
      tagline: 'এন্টারপ্রাইজ সার্ভিস প্ল্যাটফর্ম',
      summary: 'ব্যবসায়িক সেবা ব্যবস্থাপনা এবং অপারেশনের জন্য সম্পূর্ণ স্ট্যাক ওয়েব অ্যাপ্লিকেশন।',
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
                  text: 'ক্লায়েন্টকে সেবার অনুরোধ, ক্লায়েন্ট ডেটা এবং একাধিক টিম জুড়ে ব্যবসায়িক অপারেশন পরিচালনার জন্য একটি ব্যাপক প্ল্যাটফর্মের প্রয়োজন ছিল।',
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
                  text: 'ভূমিকা-ভিত্তিক অ্যাক্সেস নিয়ন্ত্রণ, রিয়েল-টাইম আপডেট এবং স্বজ্ঞাত অ্যাডমিন ড্যাশবোর্ড সহ একটি সম্পূর্ণ MERN অ্যাপ্লিকেশন তৈরি করেছি।',
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
                  text: 'সফলভাবে স্থাপন করা হয়েছে এবং এখন উন্নত টিম সমন্বয় এবং ক্লায়েন্ট সন্তুষ্টির সাথে দৈনিক ১০০+ সেবার অনুরোধ পরিচালনা করছে।',
                  type: 'text',
                }
              ]
            }
          ]
        }
      },
      myRole: 'সম্পূর্ণ স্ট্যাক ডেভেলপার - ডাটাবেস স্কিমা থেকে ফ্রন্টএন্ড UI পর্যন্ত সম্পূর্ণ প্ল্যাটফর্ম ডিজাইন এবং বাস্তবায়ন করেছি।'
    }
  },
  {
    // A2Z Assistenza - Website
    en: {
      title: 'A2Z Assistenza',
      tagline: 'Technical Support & Assistance Service',
      summary: 'Professional service website with portfolio, service listings, and client contact system.',
      slug: 'a2z-assistenza',
      category: 'frontend',
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
      stack: ['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'MongoDB'],
      links: {
        live: 'https://a2zassistenza.com'
      }
    },
    it: {
      title: 'A2Z Assistenza',
      tagline: 'Servizio di Supporto Tecnico e Assistenza',
      summary: 'Sito web professionale di servizi con portfolio, elenco servizi e sistema di contatti per clienti.',
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
                  text: 'Un\'azienda locale di assistenza IT aveva bisogno di una moderna e professionale presenza web per mostrare i servizi e attirare nuovi clienti.',
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
                  text: 'Ho creato un sito web responsive e ottimizzato per SEO con pagine di servizio, sezione portfolio, moduli di contatto e integrazione con servizi backend.',
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
                  text: 'Aumento del 40% nelle richieste di clienti e miglioramento della visibilità online attraverso l\'ottimizzazione SEO e il design moderno.',
                  type: 'text',
                }
              ]
            }
          ]
        }
      },
      myRole: 'Frontend Developer - Ho progettato e sviluppato l\'intero sito web con focus su esperienza utente e SEO.'
    },
    bn: {
      title: 'A2Z Assistenza',
      tagline: 'প্রযুক্তিগত সহায়তা এবং সহায়তা সেবা',
      summary: 'পোর্টফোলিও, সেবা তালিকা এবং ক্লায়েন্ট যোগাযোগ সিস্টেম সহ পেশাদার সেবা ওয়েবসাইট।',
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
                  text: 'একটি স্থানীয় আইটি সহায়তা কোম্পানির সেবা প্রদর্শন এবং নতুন ক্লায়েন্ট আকৃষ্ট করার জন্য একটি আধুনিক, পেশাদার ওয়েব উপস্থিতির প্রয়োজন ছিল।',
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
                  text: 'সেবা পৃষ্ঠা, পোর্টফোলিও বিভাগ, যোগাযোগ ফর্ম এবং ব্যাকএন্ড পরিষেবাগুলির সাথে একীকরণ সহ একটি প্রতিক্রিয়াশীল, SEO-অপ্টিমাইজড ওয়েবসাইট তৈরি করেছি।',
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
                  text: 'ক্লায়েন্ট অনুসন্ধানে ৪০% বৃদ্ধি এবং SEO অপ্টিমাইজেশন এবং আধুনিক ডিজাইনের মাধ্যমে অনলাইন দৃশ্যমানতা উন্নত করেছি।',
                  type: 'text',
                }
              ]
            }
          ]
        }
      },
      myRole: 'ফ্রন্টএন্ড ডেভেলপার - ব্যবহারকারী অভিজ্ঞতা এবং SEO এর উপর দৃষ্টি নিবদ্ধ করে সম্পূর্ণ ওয়েবসাইট ডিজাইন এবং বিকাশ করেছি।'
    }
  }
];

async function seedProjects() {
  try {
    console.log('🌱 Connecting to Payload CMS...');
    const payload = await getPayload({ config });

    console.log('📝 Creating projects...\n');

    for (const projectData of projects) {
      const slugEn = projectData.en.slug;

      // Check if project already exists
      const existing = await payload.find({
        collection: 'projects',
        locale: 'en',
        where: {
          slug: {
            equals: slugEn
          }
        }
      });

      if (existing.docs.length > 0) {
        console.log(`⏭️  Project "${projectData.en.title}" already exists. Skipping...`);
        continue;
      }

      // Create project with multilingual content
      try {
        const created = await payload.create({
          collection: 'projects',
          locale: 'en',
          data: {
            ...projectData.en,
            status: 'live',
            featured: true,
            completedAt: new Date().toISOString().split('T')[0],
          },
        });

        console.log(`✅ Created: ${projectData.en.title} (EN)`);

        // Update Italian translation
        await payload.update({
          collection: 'projects',
          id: created.id,
          locale: 'it',
          data: projectData.it,
        });
        console.log(`✅ Added: ${projectData.it.title} (IT)`);

        // Update Bengali translation
        await payload.update({
          collection: 'projects',
          id: created.id,
          locale: 'bn',
          data: projectData.bn,
        });
        console.log(`✅ Added: ${projectData.bn.title} (BN)\n`);

      } catch (error) {
        console.error(`❌ Error creating project "${projectData.en.title}":`, error.message);
      }
    }

    console.log('✨ Done! Projects have been added to Payload CMS.');
    console.log('📸 Note: You may need to add cover images and gallery photos via the admin panel.');
    console.log('🔗 Admin panel: http://localhost:3000/admin');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedProjects();
