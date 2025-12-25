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
      <section className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12 text-center sm:px-6 sm:py-16 md:py-20">
        <div className="flex w-full max-w-2xl flex-col items-center text-center space-y-3 sm:space-y-4 md:space-y-6">
          <Image
            src="/logo.png"
            alt="Yoload logo"
            width={160}
            height={160}
            priority
            className="h-28 w-auto sm:h-32 md:h-36"
          />
          <p className="font-semibold tracking-wide text-orange-500">
            YOLO ADVENTURES PTE. LTD.
          </p>
          <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
            Life is once. Let’s explore it together.
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            Yoload
          </h1>
          <p className="max-w-prose text-base leading-relaxed text-gray-600 sm:text-lg">
            Fast, modern logistics software.
          </p>
          <div>
            <a
              href="#contact"
              className="inline-block rounded-md bg-black px-5 py-3 text-white shadow-sm transition hover:bg-gray-800"
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
