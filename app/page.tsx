import Image from "next/image";
import ServicesSection from "./components/ServicesSection";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Yoload",
            url: "https://yoload.asia/",
            isPartOf: { "@id": "https://yoload.asia/#website" },
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: "https://yoload.asia/og.png",
              width: 1200,
              height: 630,
            },
          }),
        }}
      />
      <section className="relative overflow-hidden flex min-h-[80vh] items-center justify-center px-4 py-16 text-center sm:px-6 sm:py-20 md:py-24 bg-gradient-to-b from-orange-50/40 via-white to-white">
        <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />
        <div className="container mx-auto flex w-full max-w-3xl flex-col items-center text-center space-y-4 sm:space-y-5 md:space-y-7">
          <Image
            src="/logo.png"
            alt="Yoload logo"
            width={160}
            height={160}
            priority
            className="h-28 w-auto sm:h-32 md:h-36"
          />
          <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-orange-600">
            YOLO ADVENTURES PTE. LTD.
          </p>
          <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
            Life is once. Let’s explore it together.
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight text-gray-900">
            Yoload
          </h1>
          <p className="max-w-prose text-lg sm:text-xl leading-relaxed text-gray-600">
            Fast, modern logistics software.
          </p>
          <div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-orange-600 px-6 py-3 text-white shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 hover:bg-orange-700 active:bg-orange-800"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}

