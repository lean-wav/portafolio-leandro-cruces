"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Efecto de máquina de escribir con cursor. Respeta prefers-reduced-motion
 * (muestra el texto completo sin animar). Para evitar saltos de layout,
 * conviene reservar el alto con un espaciador invisible del mismo texto.
 */
export function Typewriter({
  text,
  className = "",
  startDelay = 0,
  speed = 18,
}: {
  text: string;
  className?: string;
  startDelay?: number;
  speed?: number;
}) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      return;
    }
    const id = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(id);
  }, [reduce, startDelay, text.length]);

  useEffect(() => {
    if (reduce || !started || count >= text.length) return;
    const id = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(id);
  }, [reduce, started, count, text.length, speed]);

  const done = count >= text.length;

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, count)}</span>
      {!reduce && (
        <span
          aria-hidden="true"
          className={`typewriter-caret${done ? " typewriter-caret--blink" : ""}`}
        />
      )}
    </span>
  );
}
