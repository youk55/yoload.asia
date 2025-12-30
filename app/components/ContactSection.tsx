"use client";

import { useEffect, useState, type FormEvent } from "react";
import Script from "next/script";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

export default function ContactSection() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState<{ message: string; kind: "success" | "error" } | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");

  useEffect(() => {
    (window as any).onTurnstileSuccess = (token: string) => {
      setTurnstileToken(token);
    };
    return () => {
      try {
        delete (window as any).onTurnstileSuccess;
      } catch {}
    };
  }, []);

  const validate = (v: FormValues): FormErrors => {
    const e: FormErrors = {};
    if (!v.name.trim()) e.name = "Name is required.";
    if (!v.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      e.email = "Enter a valid email.";
    }
    if (!v.message.trim()) e.message = "Message is required.";
    return e;
  };

  const onChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      const temp: FormValues = { ...values, [field]: value } as FormValues;
      const ve = validate(temp);
      if (!ve[field]) delete next[field];
      else next[field] = ve[field];
      return next;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(false);

    const ve = validate(values);
    setErrors(ve);
    if (Object.keys(ve).length > 0) {
      setToast({ message: "Please fix the errors and try again.", kind: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    if (!turnstileToken) {
      setToast({ message: "Please complete the verification.", kind: "error" });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, turnstileToken, honeypot }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.error || "Failed to send message.";
        setToast({ message: msg, kind: "error" });
        setTimeout(() => setToast(null), 4000);
        return;
      }

      setSubmitted(true);
      setValues({ name: "", email: "", message: "" });
      setTurnstileToken("");
      setToast({ message: "Message sent. Thank you!", kind: "success" });
      setTimeout(() => setToast(null), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full rounded-md border bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
      hasError ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <section id="contact" className="border-t">
      <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-16 md:py-20">
        {/* Toast */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className={`fixed right-4 top-20 z-[60] max-w-sm rounded-md px-4 py-3 text-sm shadow-lg ${
              toast.kind === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
          >
            {toast.message}
          </div>
        )}

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-orange-600 uppercase">
            Contact
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Let’s discuss your growth goals
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            Ads, e-commerce, and operations — tell us what you’re trying to achieve and where you’re
            stuck.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />

          <div className="grid gap-6 md:grid-cols-5">
            {/* Left: Form */}
            <div className="md:col-span-3 rounded-2xl border bg-white p-6 shadow-sm">
              <form className="grid gap-4" onSubmit={onSubmit} noValidate aria-busy={submitting}>
                {/* Honeypot */}
                <div className="sr-only" aria-hidden>
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    autoComplete="off"
                    tabIndex={-1}
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={inputClass(Boolean(errors.name))}
                      placeholder="Your name"
                      value={values.name}
                      onChange={(e) => onChange("name", e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      required
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={inputClass(Boolean(errors.email))}
                      placeholder="you@example.com"
                      value={values.email}
                      onChange={(e) => onChange("email", e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      required
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={inputClass(Boolean(errors.message))}
                    placeholder="Example: target markets, channels, budget range, and what you want to improve."
                    value={values.message}
                    onChange={(e) => onChange("message", e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    required
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Turnstile */}
                <div>
                  <div
                    className="cf-turnstile"
                    data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                    data-callback="onTurnstileSuccess"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Protected by Cloudflare Turnstile.
                    {!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                      <>
                        {" "}
                        Missing site key. Set <code>NEXT_PUBLIC_TURNSTILE_SITE_KEY</code> in env.
                      </>
                    )}
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex w-full items-center justify-center rounded-md bg-orange-600 px-4 py-2.5 text-white transition hover:bg-orange-700 active:bg-orange-800 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                  >
                    {submitting ? (
                      <>
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send message"
                    )}
                  </button>
                </div>

                {submitted && (
                  <p className="text-center text-sm text-green-700">
                    We’ve received your message. We’ll contact you soon.
                  </p>
                )}
              </form>
            </div>

            {/* Right: Info */}
            <aside className="md:col-span-2 space-y-4">
              <div className="rounded-2xl border bg-gradient-to-b from-orange-50/40 via-white to-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">What happens next</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-600" />
                    <span>We reply within 24–48 hours (business days).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-600" />
                    <span>We’ll ask a few questions and propose a simple plan.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-600" />
                    <span>No long decks — we prefer clear execution and measurable results.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">Best for</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Brands looking to improve performance marketing, e-commerce conversion, and
                  operational reporting.
                </p>
                <div className="mt-4 grid gap-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-600" />
                    <span>Scaling paid media across markets</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-600" />
                    <span>Fixing tracking and reporting</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-600" />
                    <span>Improving conversion and retention</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                <h3 className="text-base font-semibold text-gray-900">Direct contact</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <p className="text-gray-700">
                    Email:{" "}
                    <a
                      href="mailto:info@yoload.asia"
                      className="font-medium underline decoration-gray-300 underline-offset-4 hover:decoration-gray-500"
                    >
                      info@yoload.asia
                    </a>
                  </p>
                  <p className="text-gray-700">Tel: +65 8689 5869</p>
                  <p className="text-xs text-gray-500">
                    By submitting this form, you agree to be contacted about your inquiry.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
