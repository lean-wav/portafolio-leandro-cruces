"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/ui/brand-icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const socials = [
  {
    label: "GitHub",
    sub: "Ver mis repositorios",
    href: "https://github.com",
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    sub: "Conectemos",
    href: "https://linkedin.com",
    Icon: LinkedinIcon,
  },
  {
    label: "Instagram",
    sub: "Seguime",
    href: "https://instagram.com",
    Icon: InstagramIcon,
  },
  {
    label: "Correo",
    sub: "leandrocruces12@gmail.com",
    href: "mailto:leandrocruces12@gmail.com",
    Icon: Mail,
  },
];

export function SiteFooter() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };
  const item = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <footer
      id="contacto"
      className="relative scroll-mt-16 overflow-hidden border-t border-neutral-900 bg-neutral-950"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(251,191,36,0.06),transparent_55%)]" />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative mx-auto max-w-7xl px-6 py-28 md:py-40"
      >
        <motion.p
          variants={item}
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300"
        >
          Hablemos
        </motion.p>

        <motion.h2
          variants={item}
          className="mt-4 max-w-3xl font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl"
        >
          ¿Tenés un proyecto <span className="text-amber-300">en mente</span>?
        </motion.h2>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-base leading-relaxed text-neutral-400 md:text-lg"
        >
          Ya sea una web a medida, una tienda online o un producto desde cero,
          escribime y lo hacemos realidad.
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <a
            href="mailto:leandrocruces12@gmail.com"
            className="neon-cta inline-flex items-center gap-2.5 rounded-full bg-amber-400 px-8 py-4 font-heading text-base font-semibold text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 active:scale-[0.98]"
          >
            <Mail className="h-5 w-5" /> Escribime
          </a>
        </motion.div>

        {/* Tarjetas de redes */}
        <motion.div
          variants={item}
          className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {socials.map(({ label, sub, href, Icon }) => {
            const external = href.startsWith("http");
            return (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-300/40 hover:bg-neutral-900/70 hover:shadow-[0_12px_44px_rgba(251,191,36,0.12)]"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-neutral-700 bg-neutral-950 text-neutral-300 transition-colors duration-300 group-hover:border-amber-300/40 group-hover:text-amber-300">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-heading text-sm font-bold text-white">
                      {label}
                    </p>
                    <p className="truncate text-xs text-neutral-500">{sub}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-300" />
              </a>
            );
          })}
        </motion.div>

        {/* Barra inferior */}
        <motion.div
          variants={item}
          className="mt-20 flex flex-col items-start justify-between gap-3 border-t border-neutral-900 pt-8 md:flex-row md:items-center"
        >
          <p className="font-heading text-sm font-bold text-white">
            Leandro Cruces
          </p>
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Leandro Cruces. Todos los derechos
            reservados.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}
