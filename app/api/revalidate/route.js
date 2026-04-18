import { revalidatePath } from 'next/cache';

const LOCALES = ['it', 'en', 'bn'];

export async function POST(req) {
  const secret = req.headers.get('x-revalidate-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { collection, slug } = await req.json();

  if (collection === 'blog-posts') {
    for (const locale of LOCALES) {
      revalidatePath(`/${locale}/blog`);
      if (slug) revalidatePath(`/${locale}/blog/${slug}`);
    }
  } else if (collection === 'projects') {
    for (const locale of LOCALES) {
      revalidatePath(`/${locale}/projects`);
      if (slug) revalidatePath(`/${locale}/projects/${slug}`);
    }
    // home page shows featured projects
    for (const locale of LOCALES) {
      revalidatePath(`/${locale}`);
    }
  }

  return Response.json({ revalidated: true, collection, slug });
}
