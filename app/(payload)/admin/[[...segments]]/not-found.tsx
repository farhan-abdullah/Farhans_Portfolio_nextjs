import config from '@payload-config';
import { generatePageMetadata, NotFoundPage } from '@payloadcms/next/views';

import { importMap } from '../importMap.js';

export async function generateMetadata({ params, searchParams }) {
  return generatePageMetadata({ config, params, searchParams });
}

export default function NotFound({ params, searchParams }) {
  return NotFoundPage({ config, params, searchParams, importMap });
}
