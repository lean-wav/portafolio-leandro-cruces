"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  AudioWaveform,
  ChevronLeft,
  ChevronRight,
  Disc3,
  Expand,
  Layers,
  UsersRound,
  X,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Capability = {
  icon: React.ElementType;
  title: string;
  description: string;
  chips: string[];
  image: string;
};

const capabilities: Capability[] = [
  {
    icon: Disc3,
    title: "Reproductor y licencias",
    description:
      "Al entrar, un carrusel 3D de beats con reproductor integrado. Cada track muestra el productor y su precio, con la compra de licencia a un clic dentro de la app.",
    chips: ["Carrusel 3D", "Reproductor", "Comprar licencia"],
    image: "/musicdy-app-inicio.png",
  },
  {
    icon: AudioWaveform,
    title: "Explorar y descubrir",
    description:
      "Biblioteca personal con playlists, productores en tendencia y colecciones de la comunidad. Búsqueda por título, productor o BPM y filtros por género.",
    chips: ["Biblioteca", "Tendencias", "Colecciones"],
    image: "/musicdy-app-explorar.png",
  },
  {
    icon: Layers,
    title: "Studio de publicación",
    description:
      "Flujo guiado en pasos para publicar un beat, un sample/loop o una canción: se sube el archivo original y la portada, y se definen las licencias y los splits.",
    chips: ["Subir beats", "Portada", "Licencias y splits"],
    image: "/musicdy-app-estudio.png",
  },
  {
    icon: UsersRound,
    title: "Perfil de artista",
    description:
      "Perfil público con seguidores, colaboraciones, compras, billetera y estadísticas, más enlaces a Instagram y Spotify. Todo lo que necesita un productor para crecer.",
    chips: ["Seguidores", "Billetera", "Estadísticas"],
    image: "/musicdy-app-perfil.png",
  },
];

const facts = [
  { label: "Plataforma", value: "Web + App móvil" },
  { label: "Pagos integrados", value: "Stripe y Mercado Pago" },
  { label: "Modelo", value: "Licencias de beats" },
  { label: "Backend", value: "FastAPI + Supabase" },
];

const stack = [
  "Next.js",
  "React Native",
  "FastAPI",
  "Supabase",
  "Zustand",
  "Stripe",
  "Mercado Pago",
];

function Equalizer() {
  return (
    <span className="eq" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

// Posición de cada carta detrás de la del frente.
const stackOffsets = [
  { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: 26, y: 18, rotate: 3.5, scale: 0.95, opacity: 0.8 },
  { x: 48, y: 34, rotate: 6.5, scale: 0.91, opacity: 0.55 },
  { x: 66, y: 48, rotate: 9, scale: 0.87, opacity: 0.35 },
];

function CardStack({
  items,
  active,
  onExpand,
}: {
  items: Capability[];
  active: number;
  onExpand: () => void;
}) {
  const reduce = useReducedMotion();
  const n = items.length;

  return (
    <div className="relative aspect-[20/9] w-full max-w-[600px]">
      {items.map((cap, i) => {
        const pos = (i - active + n) % n;
        const front = pos === 0;
        const o = stackOffsets[Math.min(pos, stackOffsets.length - 1)];

        return (
          <motion.button
            type="button"
            key={cap.title}
            onClick={front ? onExpand : undefined}
            tabIndex={front ? 0 : -1}
            aria-hidden={!front}
            aria-label={`Ampliar captura: ${cap.title}`}
            className={`group absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-[0_24px_80px_rgba(0,0,0,0.5)] ${
              front ? "cursor-pointer" : "pointer-events-none"
            }`}
            style={{ zIndex: n - pos }}
            animate={
              reduce
                ? { opacity: front ? 1 : 0 }
                : { x: o.x, y: o.y, rotate: o.rotate, scale: o.scale, opacity: o.opacity }
            }
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <Image
              src={cap.image}
              alt={`Captura real de Musicdy: ${cap.title}`}
              fill
              priority={front}
              className="object-cover object-top"
              sizes="(max-width: 1024px) 90vw, 600px"
            />
            {front && (
              <>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-neutral-950/80 px-3 py-1.5 font-heading text-xs font-semibold text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="h-3.5 w-3.5" /> Ampliar
                </div>
              </>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

function Lightbox({
  items,
  index,
  setIndex,
  onClose,
}: {
  items: Capability[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const n = items.length;
  const cap = items[index];
  const Icon = cap.icon;
  const closeRef = useRef<HTMLButtonElement>(null);

  const go = (dir: number) => setIndex((index + dir + n) % n);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") setIndex((index - 1 + n) % n);
      else if (e.key === "ArrowRight") setIndex((index + 1) % n);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [index, n, onClose, setIndex]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Captura de Musicdy: ${cap.title}`}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-neutral-950/92 p-4 backdrop-blur-md md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300">
                <Icon className="h-4 w-4" />
              </span>
              <h3 className="font-heading text-lg font-bold text-white md:text-xl">
                {cap.title}
              </h3>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">
              {cap.description}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={cap.image}
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={cap.image}
                alt={`Captura real de Musicdy: ${cap.title}`}
                width={1264}
                height={569}
                className="h-auto w-full"
                sizes="(max-width: 768px) 100vw, 900px"
                priority
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Captura anterior"
            className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-neutral-950/80 text-white backdrop-blur transition-colors hover:border-amber-300/50 hover:text-amber-300"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Captura siguiente"
            className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-neutral-950/80 text-white backdrop-blur transition-colors hover:border-amber-300/50 hover:text-amber-300"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir a ${item.title}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-amber-400" : "w-1.5 bg-neutral-700 hover:bg-neutral-500"
                }`}
              />
            ))}
          </div>
          <a
            href="https://musicdy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-heading text-xs font-semibold text-neutral-300 transition-colors hover:text-amber-300"
          >
            Abrir en musicdy.com <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function Musicdy() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => setMounted(true), []);

  const listContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09 } },
  };
  const listItem = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section
      id="musicdy"
      className="relative scroll-mt-20 overflow-hidden border-t border-neutral-900"
    >
      {/* Tinte dorado dentro del mismo tema oscuro */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.06),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
        {/* Encabezado */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-300">
            La startup
          </p>
          <div className="mt-4 flex items-end gap-4">
            <h2 className="font-heading text-5xl font-bold leading-none tracking-tight text-white md:text-7xl">
              Musicdy
            </h2>
            <Equalizer />
          </div>
          <p className="mt-6 text-base leading-relaxed text-neutral-300 md:text-lg">
            Plataforma de streaming y marketplace de beats que estoy diseñando y
            desarrollando. Los productores publican, los artistas escuchan y las
            licencias se compran dentro de la app. Todas las capturas de abajo son
            de la app real, ya con la sesión iniciada.
          </p>
        </motion.div>

        {/* Datos del producto */}
        <motion.dl
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="mt-14 grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-4"
        >
          {facts.map((fact) => (
            <div key={fact.label} className="border-t border-neutral-800 pt-4">
              <dt className="text-xs text-neutral-500">{fact.label}</dt>
              <dd className="mt-1 font-heading text-sm font-bold text-white md:text-base">
                {fact.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Explorador interactivo de capacidades */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <motion.ul
              variants={listContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col"
            >
              {capabilities.map((cap, i) => {
                const Icon = cap.icon;
                const isActive = i === active;
                return (
                  <motion.li
                    variants={listItem}
                    key={cap.title}
                    className="border-t border-neutral-800 last:border-b"
                  >
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-expanded={isActive}
                      className={`flex w-full cursor-pointer items-center gap-4 py-5 text-left transition-colors duration-300 ${
                        isActive ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                      }`}
                    >
                      <span
                        className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                          isActive
                            ? "border-amber-400/30 bg-amber-400/10 text-amber-300"
                            : "border-neutral-800 bg-neutral-900 text-neutral-500"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="font-heading text-lg font-bold md:text-xl">
                        {cap.title}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={reduce ? false : { height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={reduce ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="pb-6 pl-13">
                            <p className="text-sm leading-relaxed text-neutral-400">
                              {cap.description}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {cap.chips.map((chip) => (
                                <span
                                  key={chip}
                                  className="rounded-md border border-neutral-800 bg-neutral-900/70 px-2 py-1 font-mono text-[10px] text-neutral-300"
                                >
                                  {chip}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </motion.ul>

            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="https://musicdy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="neon-cta inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-heading text-sm font-semibold text-neutral-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 active:scale-[0.98]"
              >
                Visitar musicdy.com <ArrowUpRight className="h-4 w-4" />
              </a>
              <div className="flex flex-wrap gap-1.5">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-neutral-800 bg-neutral-950/70 px-2 py-1 font-mono text-[10px] text-neutral-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Pila de capturas (clic para ampliar) */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="flex flex-col items-center gap-4 lg:items-end"
          >
            <CardStack items={capabilities} active={active} onExpand={() => setExpanded(true)} />
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500 transition-colors hover:text-amber-300"
            >
              <Expand className="h-3.5 w-3.5" /> Tocá una captura para ampliarla
            </button>
          </motion.div>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {expanded && (
              <Lightbox
                items={capabilities}
                index={active}
                setIndex={setActive}
                onClose={() => setExpanded(false)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
