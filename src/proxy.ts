import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/dictionaries";

const COOKIE_NAME = "NEXT_LOCALE";
const HEADER_NAME = "x-locale";

function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .find((tag) => tag.length > 0);
  return preferred?.startsWith("en") ? "en" : defaultLocale;
}

export function proxy(request: NextRequest) {
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;
  const locale: Locale = locales.includes(cookieLocale as Locale)
    ? (cookieLocale as Locale)
    : localeFromAcceptLanguage(request.headers.get("accept-language"));

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(HEADER_NAME, locale);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (!cookieLocale) {
    response.cookies.set(COOKIE_NAME, locale, { path: "/", maxAge: 31536000 });
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|ico|txt)$).*)"],
};
