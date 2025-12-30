export default function AboutSection() {
  const highlights = [
    {
      title: "Performance Advertising",
      desc: "Execution with clear KPIs, tight feedback loops, and weekly learning that compounds.",
    },
    {
      title: "E-commerce Operations",
      desc: "We help keep catalog, merchandising, and conversion execution clean and consistent.",
    },
    {
      title: "Tracking & Reporting",
      desc: "Pixels, GA4/GTM, dashboards, and decision-ready reporting — done reliably.",
    },
  ];

  const steps = [
    {
      title: "Audit",
      desc: "We review your goals, funnels, tracking setup, and current performance to find the fastest wins.",
    },
    {
      title: "Plan",
      desc: "We align on KPIs, channels, scope, and a 2–4 week execution plan you can measure.",
    },
    {
      title: "Execute",
      desc: "We ship improvements, run experiments, and report weekly with clear next actions.",
    },
  ];

  return (
    <section id="about" className="border-t">
      <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase">
            About
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            A practical growth partner for global brands
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            We support performance marketing, e-commerce execution, and the operational systems that
            keep growth predictable.
          </p>
        </div>

        {/* Highlights */}
        <div className="mx-auto mt-10 max-w-5xl">
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-gray-900">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{h.desc}</p>
              </div>
            ))}
          </div>

          {/* How we work */}
          <div className="mt-12 rounded-2xl border bg-gradient-to-b from-orange-50/40 via-white to-white p-6 sm:p-8">
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((s, i) => (
                <div key={s.title}>
                  <p className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Company details */}
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Company</h3>
              <dl className="mt-4 grid grid-cols-1 gap-y-4 text-sm">
                <div>
                  <dt className="font-medium text-gray-600">Legal name</dt>
                  <dd className="mt-1 text-gray-900">YOLO ADVENTURES PTE. LTD.</dd>
                </div>
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <dt className="font-medium text-gray-600">Representative</dt>
                    <dd className="mt-1 text-gray-900">YUKI ASHIZAKI</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-600">Founded</dt>
                    <dd className="mt-1 text-gray-900">February 29, 2016</dd>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6">
                  <div>
                    <dt className="font-medium text-gray-600">Email</dt>
                    <dd className="mt-1 text-gray-900">
                      <a
                        href="mailto:info@yoload.asia"
                        className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-500"
                      >
                        info@yoload.asia
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-600">Tel</dt>
                    <dd className="mt-1 text-gray-900">+65 8689 5869</dd>
                  </div>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">Location</h3>
              <dl className="mt-4 grid grid-cols-1 gap-y-4 text-sm">
                <div>
                  <dt className="font-medium text-gray-600">Address</dt>
                  <dd className="mt-1 text-gray-900 not-italic">
                    <address className="not-italic">
                      10 Anson Road
                      <br />
                      #21-07 International Plaza
                      <br />
                      Singapore 079903
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Website</dt>
                  <dd className="mt-1 text-gray-900">
                    <a
                      href="https://yoload.asia/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-gray-300 underline-offset-4 hover:decoration-gray-500"
                    >
                      https://yoload.asia/
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-600">Working style</dt>
                  <dd className="mt-1 text-gray-700 leading-relaxed">
                    Clear weekly reporting, practical execution, and a focus on measurable outcomes.
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="mt-10 text-center text-sm text-gray-600">
            <p>
              Want to see if we’re a fit? Send a short note with your target countries, channels,
              and current challenges.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
