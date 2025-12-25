/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const isPreview = process.env.VERCEL_ENV === 'preview';
    const plausibleHost = (process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST || 'https://plausible.io').replace(/\/$/, '');
    const gaScriptHost = 'https://www.googletagmanager.com';
    const gaCollectHost = 'https://www.google-analytics.com';
    const securityHeaders = [
      // HTTP Strict Transport Security (HSTS)
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      // Prevent MIME type sniffing
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      // Referrer policy
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      // Permissions Policy – disable powerful features by default
      {
        key: 'Permissions-Policy',
        value: [
          'accelerometer=()',
          'camera=()',
          'geolocation=()',
          'gyroscope=()',
          'magnetometer=()',
          'microphone=()',
          'payment=()',
          'usb=()'
        ].join(', '),
      },
      // Clickjacking protection
      { key: 'X-Frame-Options', value: 'DENY' },
      // Content Security Policy (adjust as needed)
      {
        key: 'Content-Security-Policy',
        value: [
          "default-src 'self'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
          "upgrade-insecure-requests",
          // Scripts: allow Turnstile and Plausible
          `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com ${plausibleHost} ${gaScriptHost}`,
          // Styles: Next.js may inject inline styles in dev
          "style-src 'self' 'unsafe-inline'",
          // Images and fonts
          `img-src 'self' data: blob: ${gaCollectHost} ${plausibleHost}`,
          "font-src 'self' data:",
          // Frames: Turnstile
          "frame-src 'self' https://challenges.cloudflare.com",
          // XHR/WebSockets / sendBeacon
          `connect-src 'self' ${plausibleHost} ${gaScriptHost} ${gaCollectHost}`,
        ].join('; '),
      },
    ];

    const headersAll = [
      ...securityHeaders,
      ...(isPreview
        ? [
            {
              key: 'X-Robots-Tag',
              value: 'noindex, nofollow',
            },
          ]
        : []),
    ];

    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: headersAll,
      },
    ];
  },
};

export default nextConfig;
