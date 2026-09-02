"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { Locale } from "@/lib/i18n/dictionaries";

function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const options: Locale[] = ["es", "en"];

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-neutral-800 bg-neutral-900/60 p-0.5">
      {options.map((option) => {
        const active = lang === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={active}
            aria-label={option === "en" ? "Switch to English" : "Cambiar a español"}
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wide transition-colors duration-300 ${
              active
                ? "bg-amber-400 text-neutral-950"
                : "text-neutral-500 hover:text-neutral-200"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export function SiteNav() {
  const { t } = useLanguage();

  const links = [
    { href: "#proyectos", label: t.nav.proyectos },
    { href: "#musicdy", label: t.nav.musicdy },
    { href: "#contacto", label: t.nav.contacto },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-neutral-950/60 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a
          href="#inicio"
          className="font-heading text-base font-bold tracking-tight text-white transition-colors hover:text-amber-300"
        >
          Leandro Cruces
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <a
            href="https://github.com/lean-wav"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-1 text-neutral-400 transition-colors hover:text-white"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/leandro-cruces-59ab69257/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-1 text-neutral-400 transition-colors hover:text-white"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href="mailto:leandrocruces12@gmail.com"
            aria-label={t.nav.sendEmail}
            className="p-1 text-neutral-400 transition-colors hover:text-white"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
