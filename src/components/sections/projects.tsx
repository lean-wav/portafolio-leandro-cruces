"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Clapperboard, ExternalLink, Globe, Play } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";

const EASE = [0.16, 1, 0.3, 1] as const;

type Project = {
  name: string;
  status: string;
  statusTone: "amber" | "neutral";
  description: string;
  url: string;
  cta: string;
  image: string;
  tags: string[];
};

const beylhe: Project = {
  name: "Beylhe",
  status: "Vendida y entregada",
  statusTone: "amber",
  description:
    "Sitio web de exhibición y e-commerce desarrollado a medida para Beylhe, una artista dedicada al diseño y venta de cuadros y obras de arte visual. Proyecto entregado de forma exitosa a cliente final.",
  url: "https://beylhe.com.ar/",
  cta: "Visitar sitio oficial",
  image: "/beylhe-real.png",
  tags: ["React", "Arte & Galería", "Tailwind"],
};

const enVenta: Project[] = [
  {
    name: "As Rey Dry Gin",
    status: "En proceso de venta",
    statusTone: "neutral",
    description:
      "El primer gin artesanal de Cutral-Có, Neuquén, galardonado con Medalla de Plata en la Copa Argentina de Destilados 2025. E-commerce premium con catálogo, carrito y pasarela de pago Mercado Pago.",
    url: "https://asreydrygin.vercel.app/",
    cta: "Ver demo",
    image: "/asrey-real.png",
    tags: ["Next.js", "MercadoPago", "Tailwind"],
  },
  {
    name: "Esteko Ingeniería",
    status: "En proceso de venta",
    statusTone: "neutral",
    description:
      "Web corporativa para consultoría civil y cálculo estructural. Muestra portafolios técnicos, detalles de ingeniería, modelado BIM avanzado y fotogrametría industrial.",
    url: "https://esteko-web.vercel.app/",
    cta: "Ver demo",
    image: "/esteko-real.png",
    tags: ["Next.js", "Ingeniería", "Interactive SVG"],
  },
];

const enProduccion: Project[] = [
  {
    name: "Enbox Gym",
    status: "Fitness & Box",
    statusTone: "neutral",
    description:
      "Landing page interactiva para centro de entrenamiento funcional y boxeo en Cutral-Có. Diseñada para potenciar conversiones con grillas de horarios interactivos, planes y registro rápido.",
    url: "https://enbox-gym.vercel.app/",
    cta: "Ver sitio",
    image: "/enbox-real.png",
    tags: ["React", "Vite", "Framer Motion"],
  },
  {
    name: "Crecer Inmobiliaria",
    status: "Portal inmobiliario",
    statusTone: "neutral",
    description:
      "Plataforma web con catálogo para Crecer Hub Inmobiliario, con trayectoria desde 1982. Incluye buscador dinámico, filtros por zona y precio, y contacto directo por propiedades.",
    url: "https://crecer-inmobiliaria.vercel.app/",
    cta: "Ver sitio",
    image: "/crecer-real.png",
    tags: ["React", "Buscador", "Tailwind CSS"],
  },
];

type VideoProject = {
  title: string;
  artist: string;
  role: string;
  description: string;
  youtubeId: string;
  tags: string[];
};

const featuredVideo: VideoProject = {
  title: "Más fotos",
  artist: "ivi",
  role: "Videoclip oficial",
  description:
    "Videoclip oficial de «Más fotos» del artista ivi. Me encargué de la grabación y del montaje completo: selección de tomas, ritmo de corte al pulso de la canción, corrección de color y armado final del video.",
  youtubeId: "J5cNz_XGaoM",
  tags: ["Grabación", "Edición", "Color"],
};

const videoclips: VideoProject[] = [
  {
    title: "siempre en tu memoria",
    artist: "LEAN",
    role: "Videoclip",
    description:
      "Videoclip grabado por Zoe Navarro y editado por mí de principio a fin: montaje, ritmo de corte y corrección de color para acompañar el tono del tema.",
    youtubeId: "XEq4gbAGzP4",
    tags: ["Edición", "Montaje", "Color"],
  },
  {
    title: "CUANDO NOS VOLVAMOS A VER",
    artist: "LEAN",
    role: "Videoclip",
    description:
      "Grabación de Zoe Navarro con edición y post-producción a mi cargo. Sincronización con la letra, transiciones y gradación de color del videoclip.",
    youtubeId: "BuTR1tqo3rY",
    tags: ["Edición", "Transiciones", "Color"],
  },
  {
    title: "QUIERO HACERTE MIA",
    artist: "LEAN",
    role: "Videoclip",
    description:
      "Videoclip filmado por Zoe Navarro y montado por mí. Selección de tomas, corte al ritmo del beat y ajuste de color para un acabado limpio y consistente.",
    youtubeId: "AbYnKe0d10A",
    tags: ["Edición", "Ritmo", "Color"],
  },
  {
    title: "LEAN",
    artist: "LEAN",
    role: "Videoclip",
    description:
      "Otro videoclip del proyecto grabado por Zoe Navarro y editado íntegramente por mí, cuidando el ritmo de corte y la estética general del video.",
    youtubeId: "R625T2VWBiI",
    tags: ["Edición", "Montaje", "Color"],
  },
];

function StatusPill({ status, tone }: { status: string; tone: Project["statusTone"] }) {
  if (tone === "amber") {
    return (
      <span className="shrink-0 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
        {status}
      </span>
    );
  }
  return (
    <span className="shrink-0 rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-300">
      {status}
    </span>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-300 hover:border-neutral-600">
      <div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block h-52 w-full overflow-hidden border-b border-neutral-800/80"
        >
          <Image
            src={project.image}
            alt={`Captura real de ${project.name}`}
            fill
            priority={priority}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 420px"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-950/90 px-3 py-1.5 font-heading text-xs font-semibold text-white">
              <ExternalLink className="h-3.5 w-3.5" /> Abrir sitio
            </span>
          </div>
        </a>
        <div className="p-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="font-heading text-lg font-bold text-white">{project.name}</h3>
            <StatusPill status={project.status} tone={project.statusTone} />
          </div>
          <p className="text-sm leading-relaxed text-neutral-400">{project.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-neutral-800/80 px-5 py-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-neutral-800 px-2 py-0.5 font-mono text-[10px] text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 font-heading text-xs font-semibold text-neutral-200 transition-colors hover:text-amber-300"
        >
          {project.cta} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-300 hover:border-neutral-600 lg:grid lg:grid-cols-[1.1fr_1fr]">
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block h-64 w-full overflow-hidden md:h-80 lg:h-full lg:min-h-[360px]"
        >
          <Image
            src={project.image}
            alt={`Captura real de ${project.name}`}
            fill
            priority
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-950/90 px-3 py-1.5 font-heading text-xs font-semibold text-white">
              <ExternalLink className="h-3.5 w-3.5" /> Abrir sitio
            </span>
          </div>
        </a>
        <div className="flex flex-col justify-center gap-5 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
              {project.name}
            </h3>
            <StatusPill status={project.status} tone={project.statusTone} />
          </div>
          <p className="text-sm leading-relaxed text-neutral-400 md:text-base">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-neutral-800 px-2 py-0.5 font-mono text-[10px] text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 font-heading text-xs font-semibold text-neutral-100 transition-all duration-300 hover:border-neutral-500 hover:text-white active:scale-[0.98]"
          >
            {project.cta} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function CardGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <Reveal key={project.name} delay={i * 0.08}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}

function thumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function videoUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

function PlayOverlay() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/10 to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-neutral-950/50 text-white backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-amber-300/60 group-hover:text-amber-300">
          <Play className="h-5 w-5 translate-x-0.5 fill-current" />
        </span>
      </div>
    </>
  );
}

function VideoCard({ video }: { video: VideoProject }) {
  return (
    <article className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-300 hover:border-neutral-600">
      <div>
        <a
          href={videoUrl(video.youtubeId)}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-video w-full overflow-hidden border-b border-neutral-800/80"
        >
          <Image
            src={thumb(video.youtubeId)}
            alt={`Miniatura del videoclip ${video.title} de ${video.artist}`}
            fill
            className="scale-[1.35] object-cover transition-transform duration-500 group-hover:scale-[1.42]"
            sizes="(max-width: 768px) 100vw, 420px"
          />
          <PlayOverlay />
        </a>
        <div className="p-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="font-heading text-lg font-bold text-white">{video.title}</h3>
            <span className="shrink-0 rounded-full border border-neutral-700 bg-neutral-900 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-300">
              {video.role}
            </span>
          </div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-amber-300/80">
            {video.artist}
          </p>
          <p className="text-sm leading-relaxed text-neutral-400">{video.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-neutral-800/80 px-5 py-4">
        <div className="flex flex-wrap gap-1.5">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-neutral-800 px-2 py-0.5 font-mono text-[10px] text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={videoUrl(video.youtubeId)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 font-heading text-xs font-semibold text-neutral-200 transition-colors hover:text-amber-300"
        >
          Ver en YouTube <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

function FeaturedVideoCard({ video }: { video: VideoProject }) {
  return (
    <Reveal>
      <article className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-300 hover:border-neutral-600 lg:grid lg:grid-cols-[1.1fr_1fr]">
        <a
          href={videoUrl(video.youtubeId)}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-video w-full overflow-hidden lg:h-full lg:min-h-[360px]"
        >
          <Image
            src={thumb(video.youtubeId)}
            alt={`Miniatura del videoclip ${video.title} de ${video.artist}`}
            fill
            priority
            className="scale-[1.35] object-cover transition-transform duration-500 group-hover:scale-[1.4]"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
          <PlayOverlay />
        </a>
        <div className="flex flex-col justify-center gap-5 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">
              {video.title}
            </h3>
            <span className="shrink-0 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
              {video.role}
            </span>
          </div>
          <p className="-mt-2 font-mono text-xs uppercase tracking-[0.18em] text-amber-300/80">
            {video.artist}
          </p>
          <p className="text-sm leading-relaxed text-neutral-400 md:text-base">
            {video.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {video.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-neutral-800 px-2 py-0.5 font-mono text-[10px] text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={videoUrl(video.youtubeId)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 font-heading text-xs font-semibold text-neutral-100 transition-all duration-300 hover:border-neutral-500 hover:text-white active:scale-[0.98]"
          >
            Ver videoclip <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function VideoGrid({ videos }: { videos: VideoProject[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {videos.map((video, i) => (
        <Reveal key={video.youtubeId} delay={i * 0.08}>
          <VideoCard video={video} />
        </Reveal>
      ))}
    </div>
  );
}

type Tab = "sitios" | "video";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "sitios", label: "Sitios web", icon: Globe },
  { id: "video", label: "Edición de video", icon: Clapperboard },
];

function TabSwitch({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/60 p-1">
      {tabs.map(({ id, label, icon: Icon }) => {
        const active = tab === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            aria-pressed={active}
            className={`relative inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 font-heading text-xs font-semibold transition-colors duration-300 md:text-sm ${
              active ? "text-neutral-950" : "text-neutral-400 hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="tabPill"
                className="absolute inset-0 rounded-full bg-amber-400"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <Icon className="h-3.5 w-3.5" />
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function Projects() {
  const [tab, setTab] = useState<Tab>("sitios");

  const sitiosData = [
    { title: "Entregados", content: <FeaturedCard project={beylhe} /> },
    { title: "En venta", content: <CardGrid projects={enVenta} /> },
    { title: "En producción", content: <CardGrid projects={enProduccion} /> },
  ];

  const videoData = [
    { title: "Destacado", content: <FeaturedVideoCard video={featuredVideo} /> },
    { title: "Videoclips", content: <VideoGrid videos={videoclips} /> },
  ];

  const isSitios = tab === "sitios";

  return (
    <section id="proyectos" className="scroll-mt-16">
      <Timeline
        data={isSitios ? sitiosData : videoData}
        title={isSitios ? "Sitios en producción" : "Edición de video"}
        description={
          isSitios
            ? "Una cronología interactiva de los sitios que diseñé y desplegué a medida sobre la infraestructura de Vercel."
            : "Videoclips musicales grabados junto a Zoe Navarro y editados por mí: montaje, ritmo de corte y corrección de color de cada tema."
        }
        headerExtra={<TabSwitch tab={tab} setTab={setTab} />}
      />
    </section>
  );
}
