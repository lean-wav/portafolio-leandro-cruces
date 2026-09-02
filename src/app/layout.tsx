import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/language-provider";
import { dictionaries, defaultLocale, locales, type Locale } from "@/lib/i18n/dictionaries";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

async function resolveLocale(): Promise<Locale> {
  const headerList = await headers();
  const fromHeader = headerList.get("x-locale");
  return locales.includes(fromHeader as Locale) ? (fromHeader as Locale) : defaultLocale;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  const { title, description } = dictionaries[locale].metadata;
  return { title, description };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveLocale();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-50">
        <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
