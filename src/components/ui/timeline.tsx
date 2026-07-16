"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({
  data,
  title = "Trabajos que he realizado",
  description = "Una cronología de las páginas web y proyectos que he desarrollado.",
  headerExtra,
}: {
  data: TimelineEntry[];
  title?: string;
  description?: string;
  headerExtra?: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  // Rango absoluto de scroll (en px) donde la línea se llena.
  const [range, setRange] = useState<[number, number]>([0, 1]);

  // Progreso global de la ventana: este motion value siempre actualiza en scroll.
  const { scrollY } = useScroll();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const h = rect.height;
      setHeight(h);
      const vh = window.innerHeight;
      // Empieza a llenarse cuando el tope entra ~90% del viewport,
      // termina cuando el final llega a la mitad del viewport.
      setRange([top - vh * 0.9, top + h - vh * 0.5]);
    };

    measure();
    window.addEventListener("resize", measure);

    // Re-medir cuando las imágenes carguen (cambia la altura real).
    const imgs = el.querySelectorAll("img");
    imgs.forEach((img) => {
      if (!img.complete) img.addEventListener("load", measure, { once: true });
    });

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [data]);

  const heightTransform = useTransform(scrollY, range, [0, height], {
    clamp: true,
  });
  const opacityTransform = useTransform(
    scrollY,
    [range[0], range[0] + 40],
    [0, 1],
    { clamp: true }
  );

  return (
    <div className="w-full bg-neutral-950 font-sans md:px-10">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-10">
        <h2 className="max-w-4xl font-heading text-3xl font-bold tracking-tight text-white md:text-5xl">
          {title}
        </h2>
        <p className="mt-4 max-w-lg leading-relaxed text-neutral-400 text-sm md:text-base">
          {description}
        </p>
        {headerExtra}
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-40">
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950">
                <div className="h-4 w-4 rounded-full border border-amber-400/30 bg-amber-400/15 p-2" />
              </div>
              <h3 className="hidden font-heading text-xl font-bold text-neutral-500 md:block md:pl-20 md:text-5xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left font-heading text-2xl font-bold text-neutral-500 md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] [background:linear-gradient(to_bottom,transparent_0%,#3f3f46_10%,#3f3f46_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-transparent from-[0%] via-[10%]"
          />
        </div>
      </div>
    </div>
  );
};
