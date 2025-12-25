import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Yoload privacy practices and data handling.",
};

export default function PrivacyPage() {
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
                name: "Privacy Policy",
                url: "https://yoload.asia/privacy",
                isPartOf: { "@id": "https://yoload.asia/#website" },
                breadcrumb: {
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    { "@type": "ListItem", position: 1, name: "Home", item: "https://yoload.asia/" },
                    { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://yoload.asia/privacy" },
                  ],
                },
              }),
            }}
          />
          <h1>Privacy Policy</h1>
          <p>
            We respect your privacy. This page outlines how we collect, use, and
            protect information when you interact with our services.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We may collect basic contact details that you choose to provide (such as
            name and email) when you submit forms on this website.
          </p>
          <h2>How We Use Information</h2>
          <p>
            We use contact information to respond to inquiries and provide support.
            We do not sell personal information.
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
