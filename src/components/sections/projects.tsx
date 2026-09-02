"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Clapperboard, ExternalLink, Globe, Play } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { Timeline } from "@/components/ui/timeline";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const EASE = [0.16, 1, 0.3, 1] as const;

type ProjectId = "mindfulness" | "beylhe" | "asrey" | "esteko" | "enbox" | "crecer";

type Project = {
  id: ProjectId;
  name: string;
  status: string;
  statusTone: "amber" | "neutral";
  description: string;
  url: string;
  cta: string;
  image: string;
  tags: string[];
};

const projectMeta: Record<ProjectId, { url: string; image: string; statusTone: "amber" | "neutral" }> = {
  mindfulness: {
    url: "https://www.mindfulnessbuenosaires.com/",
    image: "/mindfulness-real.png",
    statusTone: "amber",
  },
  beylhe: { url: "https://beylhe.com.ar/", image: "/beylhe-real.png", statusTone: "amber" },
  asrey: {
    url: "https://asreydrygin.vercel.app/",
    image: "/asrey-real.png",
    statusTone: "neutral",
  },
  esteko: {
    url: "https://esteko-web.vercel.app/",
    image: "/esteko-real.png",
    statusTone: "neutral",
  },
  enbox: {
    url: "https://enbox-gym.vercel.app/",
    image: "/enbox-real.png",
    statusTone: "neutral",
  },
  crecer: {
    url: "https://crecer-inmobiliaria.vercel.app/",
    image: "/crecer-real.png",
    statusTone: "neutral",
  },
};

function buildProject(t: Dictionary, id: ProjectId): Project {
  return { id, ...projectMeta[id], ...t.projects.items[id] };
}

type VideoId = "featured" | "memoria" | "volver" | "mia" | "lean";

type VideoProject = {
  id: VideoId;
  title: string;
  artist: string;
  role: string;
  description: string;
  youtubeId: string;
  tags: string[];
};

const videoMeta: Record<VideoId, { artist: string; youtubeId: string }> = {
  featured: { artist: "ivi", youtubeId: "J5cNz_XGaoM" },
  memoria: { artist: "LEAN", youtubeId: "XEq4gbAGzP4" },
  volver: { artist: "LEAN", youtubeId: "BuTR1tqo3rY" },
  mia: { artist: "LEAN", youtubeId: "AbYnKe0d10A" },
  lean: { artist: "LEAN", youtubeId: "R625T2VWBiI" },
};

function buildVideo(t: Dictionary, id: VideoId): VideoProject {
  return { id, ...videoMeta[id], ...t.projects.videos[id] };
}

const musicdyContentMeta = {
  brand: "Musicdy",
  handle: "@musicdy.app",
  url: "https://www.instagram.com/musicdy.app/",
};

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

function ProjectCard({
  project,
  hoverLabel,
  priority = false,
}: {
  project: Project;
  hoverLabel: string;
  priority?: boolean;
}) {
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
            alt={`${project.name}`}
            fill
            priority={priority}
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 420px"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-950/90 px-3 py-1.5 font-heading text-xs font-semibold text-white">
              <ExternalLink className="h-3.5 w-3.5" /> {hoverLabel}
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

function FeaturedCard({ project, hoverLabel }: { project: Project; hoverLabel: string }) {
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
            alt={`${project.name}`}
            fill
            priority
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-950/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-700 bg-neutral-950/90 px-3 py-1.5 font-heading text-xs font-semibold text-white">
              <ExternalLink className="h-3.5 w-3.5" /> {hoverLabel}
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

function CardGrid({ projects, hoverLabel }: { projects: Project[]; hoverLabel: string }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {projects.map((project, i) => (
        <Reveal key={project.id} delay={i * 0.08}>
          <ProjectCard project={project} hoverLabel={hoverLabel} />
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

function VideoCard({ video, verEnYoutube }: { video: VideoProject; verEnYoutube: string }) {
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
            alt={`${video.title} — ${video.artist}`}
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
          {verEnYoutube} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

function FeaturedVideoCard({ video, verVideoclip }: { video: VideoProject; verVideoclip: string }) {
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
            alt={`${video.title} — ${video.artist}`}
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
            {verVideoclip} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function VideoGrid({ videos, verEnYoutube }: { videos: VideoProject[]; verEnYoutube: string }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {videos.map((video, i) => (
        <Reveal key={video.id} delay={i * 0.08}>
          <VideoCard video={video} verEnYoutube={verEnYoutube} />
        </Reveal>
      ))}
    </div>
  );
}

function BrandContentCard({ t }: { t: Dictionary }) {
  const c = { ...musicdyContentMeta, ...t.projects.musicdyContent };
  return (
    <Reveal>
      <article className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 transition-all duration-300 hover:border-neutral-600 lg:grid lg:grid-cols-[1.1fr_1fr]">
        <a
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${c.brand} — Instagram`}
          className="relative flex aspect-video w-full items-center justify-center overflow-hidden border-b border-neutral-800/80 bg-neutral-950 lg:h-full lg:min-h-[360px] lg:border-b-0 lg:border-r"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.12),transparent_65%)]" />
          <div className="relative flex flex-col items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10 text-amber-300 transition-transform duration-300 group-hover:scale-105">
              <InstagramIcon className="h-7 w-7" />
            </span>
            <span className="font-heading text-xl font-bold text-white md:text-2xl">
              {c.handle}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
              {c.contentInProgress}
            </span>
          </div>
        </a>
        <div className="flex flex-col justify-center gap-5 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <h3 className="font-heading text-2xl font-bold text-white md:text-3xl">{c.brand}</h3>
            <span className="shrink-0 rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-300">
              {c.role}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-400 md:text-base">{c.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {c.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-neutral-800 px-2 py-0.5 font-mono text-[10px] text-neutral-300"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-neutral-700 px-5 py-2.5 font-heading text-xs font-semibold text-neutral-100 transition-all duration-300 hover:border-neutral-500 hover:text-white active:scale-[0.98]"
          >
            {c.cta} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

type Tab = "sitios" | "video";

function TabSwitch({
  tab,
  setTab,
  t,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  t: Dictionary;
}) {
  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "sitios", label: t.projects.tabs.sitios, icon: Globe },
    { id: "video", label: t.projects.tabs.video, icon: Clapperboard },
  ];

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
  const { t } = useLanguage();
  const [tab, setTab] = useState<Tab>("sitios");

  const mindfulness = buildProject(t, "mindfulness");
  const beylhe = buildProject(t, "beylhe");
  const enVenta = [buildProject(t, "asrey"), buildProject(t, "esteko")];
  const enProduccion = [buildProject(t, "enbox"), buildProject(t, "crecer")];

  const featuredVideo = buildVideo(t, "featured");
  const videoclips = (["memoria", "volver", "mia", "lean"] as const).map((id) => buildVideo(t, id));

  const hoverLabel = t.projects.hoverOpenSite;

  const sitiosData = [
    {
      title: t.projects.groups.entregados,
      content: (
        <div className="space-y-6">
          <FeaturedCard project={mindfulness} hoverLabel={hoverLabel} />
          <FeaturedCard project={beylhe} hoverLabel={hoverLabel} />
        </div>
      ),
    },
    {
      title: t.projects.groups.enVenta,
      content: <CardGrid projects={enVenta} hoverLabel={hoverLabel} />,
    },
    {
      title: t.projects.groups.enProduccion,
      content: <CardGrid projects={enProduccion} hoverLabel={hoverLabel} />,
    },
  ];

  const videoData = [
    {
      title: t.projects.groups.destacado,
      content: <FeaturedVideoCard video={featuredVideo} verVideoclip={t.projects.videos.verVideoclip} />,
    },
    {
      title: t.projects.groups.videoclips,
      content: <VideoGrid videos={videoclips} verEnYoutube={t.projects.videos.verEnYoutube} />,
    },
    {
      title: t.projects.groups.contenidoMarca,
      content: <BrandContentCard t={t} />,
    },
  ];

  const isSitios = tab === "sitios";

  return (
    <section id="proyectos" className="scroll-mt-16">
      <Timeline
        data={isSitios ? sitiosData : videoData}
        title={isSitios ? t.projects.timeline.sitiosTitle : t.projects.timeline.videoTitle}
        description={
          isSitios ? t.projects.timeline.sitiosDescription : t.projects.timeline.videoDescription
        }
        headerExtra={<TabSwitch tab={tab} setTab={setTab} t={t} />}
      />
    </section>
  );
}
