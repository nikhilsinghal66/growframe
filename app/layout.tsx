import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://growframe.co";
const title = "Growframe — Creator Growth Systems";
const description =
  "Premium editing, thumbnail systems, and scalable content operations for creators serious about growth.";

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
    </html>
  );
}
