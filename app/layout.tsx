import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Instrument_Serif, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/app/content/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Karim Matar, full-stack developer",
    template: "%s · Karim Matar",
  },
  description:
    "Karim Matar is a full-stack developer in Belgium. He builds web apps in React and Next.js, with Laravel, PHP and Node.js on the server side.",
  applicationName: "Karim Matar",
  authors: [{ name: "Karim Matar" }],
  creator: "Karim Matar",
  publisher: "Karim Matar",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "/en",
    siteName: "Karim Matar",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = {
  themeColor: "#f6f5f1",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${notoArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {/* The language now lives in the URL, so the document attributes come
            from the path. Runs before paint to avoid a direction flash. */}
        <Script id="locale-bootstrap" strategy="beforeInteractive">
          {`try{var m=location.pathname.match(/^\\/(en|nl|ar)/);var l=m?m[1]:"en";var r=document.documentElement;r.lang=l;r.dir=l==="ar"?"rtl":"ltr"}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}