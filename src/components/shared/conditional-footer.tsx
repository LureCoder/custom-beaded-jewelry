// conditional-footer.tsx: 条件 Footer — Designer 页面隐藏
'use client';

import { usePathname } from '@/i18n/routing';
import { Footer } from '@/components/layout/footer';

export function ConditionalFooter() {
  const pathname = usePathname();

  if (pathname.includes('/designer')) return null;

  return <Footer />;
}
