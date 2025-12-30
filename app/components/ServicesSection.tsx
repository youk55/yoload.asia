// app/components/ServicesSection.tsx
import React from "react";

type Service = {
  title: string;
  description: string;
  bullets: string[];
};

export default function ServicesSection() {
  const services: Service[] = [
    {
      title: "Performance Advertising",
      description:
        "Paid media execution that is measurable, repeatable, and aligned with your revenue goals.",
      bullets: ["Meta / Google / TikTok", "Creative & iteration loops", "Weekly reporting & insights"],
    },
    {
      title: "E-commerce Growth",
      description:
        "Conversion-focused improvements across the customer journey — from landing pages to CRM.",
      bullets: ["CRO & funnel analysis", "LP/Shop optimization", "Email/CRM coordination"],
    },
    {
      title: "Operations & Analytics",
      description:
        "A reliable ops partner to keep execution clean: tracking, dashboards, QA, and process.",
      bullets: ["GA4 / GTM / Pixels", "Dashboards & KPI definitions", "Ops QA & documentation"],
    },
  ];

  return (
    <section className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase">
            Services
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Ads × E-commerce × Operations — end to end
          </h2>
          <p className="mt-4 text-base text-gray-600 sm:text-lg">
            We support global brands with performance marketing, e-commerce execution, and the
            operational systems that keep growth predictable.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-gray-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.description}</p>

              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-orange-600"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
