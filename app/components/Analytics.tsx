import Script from "next/script";

type Props = {
  provider?: string;
  domain?: string;
  apiHost?: string;
};

export default function Analytics(props: Props) {
  const provider = (
    props.provider ||
    process.env.ANALYTICS_PROVIDER ||
    process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER ||
    "plausible"
  ).toLowerCase();

  if (provider === "none" || provider === "disabled") return null;

  if (provider === "plausible") {
    // Only load in production
    const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
    if (!isProd) return null;
    const domain = props.domain || process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "yoload.asia";
    const apiHost = props.apiHost || process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST || "https://plausible.io";
    return <Script defer data-domain={domain} src={`${apiHost.replace(/\/$/, "")}/js/script.js`} />;
  }

  if (provider === "ga4") {
    // Only load in production
    const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
    if (!isProd) return null;
    const gaId = process.env.NEXT_PUBLIC_GA_ID || process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (!gaId) return null;
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
      </>
    );
  }

  // Unknown provider; no-op by default
  return null;
}
