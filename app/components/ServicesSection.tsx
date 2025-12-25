export default function ServicesSection() {
  const services = [
    {
      title: "Advertising Operations",
      desc:
        "Optimize campaigns with creative testing, KPI design, and rigorous operations to maximize results.",
    },
    {
      title: "E-commerce Support",
      desc:
        "From store setup to operations improvements and fulfillment integrations, end-to-end.",
    },
    {
      title: "Consulting",
      desc:
        "Issue discovery, strategy, and hands-on execution with change management.",
    },
  ];

  return (
    <section id="services" className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: services.map((s, i) => ({
                "@type": "ListItem",
                position: i + 1,
                item: {
                  "@type": "Service",
                  name: s.title,
                  description: s.desc,
                  provider: {
                    "@type": "Organization",
                    name: "YOLO ADVENTURES PTE. LTD.",
                    url: "https://yoload.asia/",
                  },
                },
              })),
            }),
          }}
        />
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Services
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            Tools that make logistics faster, clearer, and easier to run.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-lg border bg-white p-6 shadow-sm transition hover:shadow-md focus-within:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.desc}</p>
              <div className="mt-4">
                <a
                  href="#contact"
                  className="inline-flex items-center text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  Learn more
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
