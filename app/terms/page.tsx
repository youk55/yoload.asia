import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Yoload website terms and conditions.",
};

export default function TermsPage() {
  const updated = new Date().toISOString().slice(0, 10);
  return (
    <section className="border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl prose prose-gray">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Terms of Service",
                url: "https://yoload.asia/terms",
                isPartOf: { "@id": "https://yoload.asia/#website" },
                breadcrumb: {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://yoload.asia/" },
                    { "@type": "ListItem", position: 2, name: "Terms of Service", item: "https://yoload.asia/terms" },
                  ],
                },
              }),
            }}
          />
          <h1>Terms of Service</h1>
          <p>
            By using this website, you agree to these terms. If you do not agree,
            please do not use the site.
          </p>
          <h2>Use of Site</h2>
          <p>
            Content is provided for general information only and may change without notice.
          </p>
          <h2>Contact</h2>
          <p>
            Company: <strong>YOLO ADVENTURES PTE. LTD.</strong><br />
            Email: <a href="mailto:info@yoload.asia">info@yoload.asia</a>
          </p>
          <p className="text-sm text-gray-500">Last updated: {updated}</p>
        </div>
      </div>
    </section>
  );
}
