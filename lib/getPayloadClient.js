/**
 * Helper to get a local (in-process) Payload instance from Server Components.
 * Faster than fetching /api/* — no HTTP round-trip.
 *
 * Usage:
 *   import { getPayloadClient } from '@/lib/getPayloadClient';
 *   const payload = await getPayloadClient();
 *   const { docs } = await payload.find({ collection: 'projects', locale: lang, limit: 6 });
 */
import { getPayload } from 'payload';
import config from '@payload-config';

let cached = null;

export async function getPayloadClient() {
  if (cached) return cached;
  cached = await getPayload({ config });
  return cached;
}
