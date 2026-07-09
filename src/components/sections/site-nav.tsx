import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";

const links = [
  { href: "#proyectos", label: "Proyectos" },
  { href: "#musicdy", label: "Musicdy" },
  { href: "#contacto", label: "Contacto" },
];

export function SiteNav() {
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
            aria-label="Enviar correo"
            className="p-1 text-neutral-400 transition-colors hover:text-white"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </nav>
    </header>
  );
}
