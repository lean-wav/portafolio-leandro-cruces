"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { dictionaries, type Dictionary, type Locale } from "@/lib/i18n/dictionaries";

const COOKIE_NAME = "NEXT_LOCALE";

type LanguageContextValue = {
  lang: Locale;
  t: Dictionary;
  setLang: (lang: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Locale>(initialLocale);

  const setLang = useCallback((next: Locale) => {
    setLangState(next);
    document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: dictionaries[lang], setLang }),
    [lang, setLang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
