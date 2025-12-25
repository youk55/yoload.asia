import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import Script from "next/script";
import Analytics from "./components/Analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://yoload.asia"),
  title: "Yoload",
  description: "Fast, modern logistics software.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      "/favicon.svg",
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      { rel: "mask-icon", url: "/mask-icon.svg", color: "#000000" },
    ],
  },
  themeColor: "#ffffff",
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Yoload",
    description: "Fast, modern logistics software.",
    url: "/",
    siteName: "Yoload",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Yoload — Fast, modern logistics software",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yoload",
    description: "Fast, modern logistics software.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://yoload.asia/#organization",
              name: "YOLO ADVENTURES PTE. LTD.",
              url: "https://yoload.asia",
              logo: "https://yoload.asia/logo.png",
              email: "info@yoload.asia",
              telephone: "+65 8689 5869",
              address: "Singapore",
              sameAs: [],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "info@yoload.asia",
                  telephone: "+65 8689 5869",
                  availableLanguage: ["en"],
                },
              ],
            }),
          }}
        />
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://yoload.asia/#website",
              name: "Yoload",
              url: "https://yoload.asia/",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://yoload.asia/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="min-h-screen bg-white text-gray-900">
          {children}
        </main>
        <Footer />
        {/* Analytics (provider switched via env) */}
        {(() => {
          const provider = (
            process.env.ANALYTICS_PROVIDER ||
            process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ||
            "plausible"
          ).toLowerCase();
          if (provider === "none" || provider === "disabled") return null;
          return <Analytics provider={provider} />;
        })()}
      </body>
    </html>
  );
}
