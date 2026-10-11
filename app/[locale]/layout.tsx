import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import { THEME_COLORS } from "@/app/lib/theme";
import { siteUrl } from "@/app/content/site";
import { locales } from "@/app/lib/messages";
import type { Locale } from "@/app/content/site";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#16130f" },
  ],
  colorScheme: "light dark",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${notoArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {/* Apply the saved theme before first paint so nothing flashes.
            Uses a plain inline <script> (not next/script) to run synchronously
            in the body while parsing. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var k='theme';var s;(function(){try{s=localStorage.getItem(k)}catch(e){}})();var m=s==='light'||s==='dark'?s:'system';var d=m==='dark'||(m==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var r=document.documentElement;r.classList.toggle('dark',d);r.style.colorScheme=d?'dark':'light';var t=document.querySelector('meta[name="theme-color"]');if(t)t.setAttribute('content',d?'${THEME_COLORS.dark}':'${THEME_COLORS.light}')}catch(e){}`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}