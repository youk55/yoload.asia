import Image from "next/image";
import PartnersSection from "./components/PartnersSection";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/40 via-white to-white">
        {/* Decorative accents */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />
          <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-orange-100/50 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:py-24 relative">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase">
              Ads × E-commerce × Operations
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl leading-tight">
              We help brands scale globally with performance marketing and e-commerce operations.
            </h1>

            <p className="text-lg text-gray-600 sm:text-xl">
              From acquisition to conversion and reporting — a reliable partner team based in Singapore.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 active:bg-orange-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                Let’s talk
              </a>

              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                Explore services
              </a>
            </div>

            {/* Optional: small trust hint */}
            <div className="pt-6">
              <p className="text-sm text-gray-500">
                Trusted by teams we support across marketing and operations.
              </p>
            </div>
          </div>

          {/* Optional image/visual (keep light) */}
          <div className="mx-auto mt-12 max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">
              <Image
                src="/og.png"
                alt="Yoload preview"
                width={1600}
                height={900}
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services">
        <ServicesSection />
      </section>

      {/* Partners (NEW) */}
      <PartnersSection />

      {/* About */}
      <section id="about">
        <AboutSection />
      </section>

      {/* Contact */}
      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
