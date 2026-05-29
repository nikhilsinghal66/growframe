import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const siteUrl = "https://growframe.co";
const title = "Growframe — Creator Growth Systems";
const description =
  "Premium editing, thumbnail systems, and scalable content operations for creators serious about growth.";
const googleAnalyticsId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-8FM88PQ4LL";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "Growframe",
  authors: [{ name: "Growframe" }],
  creator: "Growframe",
  publisher: "Growframe",
  keywords: [
    "creator growth agency",
    "video editing",
    "thumbnail design",
    "content strategy",
    "short-form scaling",
    "creator systems",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Growframe",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Growframe — Creator Growth Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/twitter-image"],
  },
  icons: {
    icon: [
      {
        url: "/growframe-mark.svg",
        type: "image/svg+xml",
        sizes: "any",
      },
    ],
    shortcut: ["/growframe-mark.svg"],
    apple: [
      {
        url: "/growframe-mark.svg",
        type: "image/svg+xml",
      },
    ],
  },
  category: "business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}');
        `}
      </Script>
      <Script id="jsonld-organization" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Growframe",
          url: siteUrl,
          logo: `${siteUrl}/growframe-mark.svg`,
          email: "growframe.agency@gmail.com",
          sameAs: [
            "https://instagram.com/growframe",
            "https://youtube.com/growframe",
            "https://www.linkedin.com/company/growframe",
            "https://x.com/growframe",
          ],
        })}
      </Script>

      <Script id="jsonld-professionalservice" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Growframe",
          url: siteUrl,
          logo: `${siteUrl}/growframe-mark.svg`,
          description,
          email: "growframe.agency@gmail.com",
          areaServed: "Worldwide",
          serviceType: ["Video Editing", "Content Strategy", "Thumbnail Design", "Short-form Scaling"],
        })}
      </Script>

      <Script id="jsonld-website" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Growframe",
          url: siteUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteUrl}/?s={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        })}
      </Script>
    </html>
  );
}
