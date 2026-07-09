import { SiteNav } from "@/components/sections/site-nav";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Musicdy } from "@/components/sections/musicdy";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-neutral-950 font-sans text-neutral-100 selection:bg-amber-400/20 selection:text-amber-100">
      <SiteNav />
      <main>
        <Hero />
        <Projects />
        <Musicdy />
      </main>
      <SiteFooter />
    </div>
  );
}
