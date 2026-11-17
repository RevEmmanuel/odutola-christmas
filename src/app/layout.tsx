import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/manrope/index.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "./globals.css";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · ${site.event.displayDates}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: "website",
    title: `${site.name} — ${site.hero.tagline}`,
    description: site.description,
    siteName: site.name,
    images: [{ url: "/brand/og.jpg", width: 1200, height: 630, alt: "Odutola family crest" }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description, images: ["/brand/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0a120f", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: site.name,
    description: site.description,
    startDate: "2026-12-24",
    endDate: "2026-12-26",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: { "@type": "Organization", name: site.host },
    ...(site.info.venue ? { location: { "@type": "Place", name: site.info.venue, address: site.info.city } } : {}),
  };
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-gold focus:px-4 focus:py-2 focus:text-night">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
