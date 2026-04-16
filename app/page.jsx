// This file won't normally be reached because middleware redirects '/' to '/{locale}'.
// Keeping it as a safe fallback.
import { redirect } from 'next/navigation';
import { i18n } from '@/lib/i18n-config';

export default function RootPage() {
  redirect(`/${i18n.defaultLocale}`);
}
