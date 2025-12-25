import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(_req: NextRequest) {
  if (process.env.VERCEL_ENV === 'preview') {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return res;
  }
  return NextResponse.next();
}

// Apply to all routes; static assets are fine to include
export const config = {
  matcher: ['/(:path*)'],
};

