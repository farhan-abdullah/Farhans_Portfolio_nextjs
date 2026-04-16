import config from '@payload-config';
import { generatePageMetadata, RootPage } from '@payloadcms/next/views';

import { importMap } from '../importMap.js';

export async function generateMetadata({ params, searchParams }) {
  return generatePageMetadata({ config, params, searchParams });
}

export default function Page({ params, searchParams }) {
  return RootPage({ config, params, searchParams, importMap });
}
