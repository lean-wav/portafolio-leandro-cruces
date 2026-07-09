"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { ShaderAnimation } from "@/components/ui/shader-lines";
import { Typewriter } from "@/components/ui/typewriter";

const EASE = [0.16, 1, 0.3, 1] as const;

const SUBTITLE =
  "Soy Leandro Cruces, desarrollador full-stack. Construyo sitios en producción para clientes reales y estoy creando Musicdy, mi startup musical.";

/** Revelado palabra por palabra: cada palabra sube desde abajo con máscara. */
function WordsReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={`inline-flex flex-wrap justify-center gap-x-[0.28em] ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden py-1 -my-1">
          <motion.span
            className="inline-block"
            initial={reduce ? { opacity: 0 } : { y: "115%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            transition={{ duration: 0.85, delay: delay + i * 0.09, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();

  // Botones: contenedor que escalona la entrada de cada botón.
  const buttonsWrap: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.14, delayChildren: reduce ? 0 : 2 },
    },
  };
  const buttonItem: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 190, damping: 15 },
    },
  };

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100dvh] items-center overflow-hidden border-b border-neutral-900"
    >
      {/* Fondo shader animado (Three.js) */}
      <div className="absolute inset-0">
        <ShaderAnimation />
      </div>

      {/* Scrims simétricos para legibilidad del texto centrado */}
      <div className="pointer-events-none absolute inset-0 bg-neutral-950/55" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_50%,rgba(10,10,10,0.55),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 pt-16 text-center">
        <h1 className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] md:text-6xl">
          {/* Línea 1: enfoque desde desenfoque (blur focus-in) */}
          <motion.span
            className="block"
            initial={reduce ? { opacity: 0 } : { opacity: 0, filter: "blur(16px)", y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
          >
            Webs y productos
          </motion.span>

          {/* Línea 2: revelado palabra por palabra */}
          <span className="block">
            <WordsReveal text="digitales que se sienten" delay={0.7} />
          </span>

          {/* Línea 3: pop con resorte, en ámbar */}
          <motion.span
            className="block text-amber-300"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.55 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reduce
                ? { duration: 0.5, delay: 0.2 }
                : { type: "spring", stiffness: 210, damping: 12, delay: 1.25 }
            }
          >
            premium.
          </motion.span>
        </h1>

        {/* Subtítulo: se escribe solo (typewriter). Espaciador invisible reserva el alto. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reduce ? 0.3 : 1.2 }}
          className="relative mx-auto mt-6 max-w-xl"
        >
          <p
            aria-hidden="true"
            className="invisible text-base leading-relaxed text-neutral-300 md:text-lg"
          >
            {SUBTITLE}
          </p>
          <p className="absolute inset-0 text-base leading-relaxed text-neutral-300 md:text-lg">
            <Typewriter text={SUBTITLE} startDelay={reduce ? 0 : 1400} speed={15} />
          </p>
        </motion.div>

        {/* Botones: entran con resorte, escalonados */}
        <motion.div
          variants={buttonsWrap}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <motion.a
            variants={buttonItem}
            href="#proyectos"
            className="inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-heading text-sm font-semibold text-neutral-950 transition-colors duration-300 hover:bg-amber-300 active:scale-[0.98]"
          >
            Ver proyectos <ArrowDown className="h-4 w-4" />
          </motion.a>
          <motion.a
            variants={buttonItem}
            href="#musicdy"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-600 bg-neutral-950/40 px-6 py-3 font-heading text-sm font-semibold text-neutral-200 backdrop-blur-sm transition-colors duration-300 hover:border-neutral-400 hover:text-white active:scale-[0.98]"
          >
            Conocer Musicdy <ArrowUpRight className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
