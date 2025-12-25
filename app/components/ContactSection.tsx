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
  // Honeypot field (should remain empty)
  const [honeypot, setHoneypot] = useState<string>("");

  // Expose callback for Cloudflare Turnstile widget
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

  const onChange = (
    field: keyof FormValues,
    value: string
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Live-validate the single field
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
    `w-full rounded-md border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 ${
      hasError ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <section id="contact" className="border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-20">
        {/* Toast */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className={`fixed right-4 top-20 z-[60] max-w-sm rounded-md px-4 py-3 text-sm shadow-lg ${
              toast.kind === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.message}
          </div>
        )}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Contact
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-600 sm:text-lg">
            Tell us about your logistics challenges. We’ll get back shortly.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl">
          {/* Turnstile script */}
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <form className="grid gap-4" onSubmit={onSubmit} noValidate aria-busy={submitting}>
            {/* Honeypot (hidden from users) */}
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
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className={inputClass(Boolean(errors.message))}
                placeholder="How can we help?"
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
            {/* Cloudflare Turnstile widget */}
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
                    {' '}Missing site key. Set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` in env.
                  </>
                )}
              </p>
            </div>
            <div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-md bg-black px-4 py-2 text-white transition hover:bg-gray-800 disabled:opacity-60"
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
                We have received your message. We will contact you soon.
              </p>
            )}
            <p className="text-center text-xs text-gray-500">
              This form is a placeholder. Hook it up to your preferred backend.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
