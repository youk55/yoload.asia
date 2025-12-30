// app/components/PartnersSection.tsx
import Image from "next/image";

const partners = [
  {
    name: "LADDER",
    href: "https://ladder.co.jp/",
    src: "/partners/ladder.webp",
    width: 220,
    height: 56,
  },
  {
    name: "Cava de Oro Asia",
    href: "https://cavadeoroasia.com/en/",
    src: "/partners/cavadeoro.png",
    width: 220,
    height: 56,
  },
];

export default function PartnersSection() {
  return (
    <section aria-label="Partners" className="py-14">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase">
            Partners
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Teams we work with
          </h2>
          <p className="mt-2 text-gray-600">
            Trusted partners across advertising, e-commerce, and operations.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {partners.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
            >
              <div className="flex items-center justify-center">
                <Image
                  src={p.src}
                  alt={`${p.name} logo`}
                  width={p.width}
                  height={p.height}
                  className="h-12 w-auto opacity-95 transition group-hover:opacity-100"
                />
              </div>
              <p className="mt-4 text-center text-sm text-gray-600">{p.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
