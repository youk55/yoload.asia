export default function AboutSection() {
  return (
    <section id="about" className="border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            About
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            Fast, modern logistics software for clear and efficient operations.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-600">Company</dt>
              <dd className="mt-1 text-gray-900">YOLO ADVENTURES PTE. LTD.</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600">Representative</dt>
              <dd className="mt-1 text-gray-900">YUKI ASHIZAKI</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600">Founded</dt>
              <dd className="mt-1 text-gray-900">February 29, 2016</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-600">Email</dt>
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
              <dt className="text-sm font-medium text-gray-600">Tel</dt>
              <dd className="mt-1 text-gray-900">86895869</dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-600">Address</dt>
              <dd className="mt-1 text-gray-900 not-italic">
                <address className="not-italic">
                  10 Anson Road<br />
                  #21-07 International Plaza<br />
                  Singapore 079903
                </address>
              </dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-sm font-medium text-gray-600">Website</dt>
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
          </dl>

          <div className="mt-10 max-w-4xl text-gray-700">
            <p className="leading-relaxed">
              We blend practical logistics expertise with thoughtful product design to
              streamline daily workflows and improve customer experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
