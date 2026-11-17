"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const silk = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise on scroll into view. */
export function Reveal({
  children, delay = 0, y = 28, className, as = "div",
}: { children: ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "span" | "li" | "p" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: silk, delay }}
    >
      {children}
    </M>
  );
}

/** Masked word-by-word headline reveal. */
export function SplitHeadline({
  text, className, delay = 0, as = "h2", inView = true, lang, id,
}: { id?: string; text: string; className?: string; delay?: number; as?: "h1" | "h2" | "h3" | "p"; inView?: boolean; lang?: string }) {
  const words = text.split(" ");
  const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: delay } } };
  const word: Variants = {
    hidden: { y: "110%", rotate: 4 },
    show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: silk } },
  };
  const M = motion[as];
  const trigger = inView
    ? { whileInView: "show" as const, viewport: { once: true, margin: "-8% 0px" } }
    : { animate: "show" as const };
  return (
    <M className={className} variants={container} initial="hidden" {...trigger} aria-label={text} lang={lang} id={id}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span className="inline-block origin-bottom-left" variants={word}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

/** Numbered section label, e.g. "02 — The Celebration". */
export function SectionMark({ n, label, tone = "gold" }: { n: string; label: string; tone?: "gold" | "ink" }) {
  return (
    <div className={`flex items-center gap-4 eyebrow ${tone === "gold" ? "text-gold" : "text-burgundy"}`}>
      <span className="font-display text-sm tracking-normal not-italic">{n}</span>
      <span className={`h-px w-12 ${tone === "gold" ? "bg-gold/60" : "bg-burgundy/50"}`} />
      <span>{label}</span>
    </div>
  );
}

/**
 * The almond "eye" taken from the family crest — used as the site's
 * recurring frame. Drawn as a line so it can animate in.
 */
export function EyeOutline({
  className, stroke = "currentColor", draw = true, strokeWidth = 1,
}: { className?: string; stroke?: string; draw?: boolean; strokeWidth?: number }) {
  const reduce = useReducedMotion();
  const d = "M4 100 Q 200 -40 396 100 Q 200 240 4 100 Z";
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" aria-hidden preserveAspectRatio="xMidYMid meet">
      <motion.path
        d={d} stroke={stroke} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke"
        initial={draw && !reduce ? { pathLength: 0, opacity: 0 } : false}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: silk }}
      />
      <motion.path
        d="M18 100 Q 200 -24 382 100 Q 200 224 18 100 Z"
        stroke={stroke} strokeWidth={strokeWidth} vectorEffect="non-scaling-stroke" opacity={0.4}
        initial={draw && !reduce ? { pathLength: 0 } : false}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.8, ease: silk, delay: 0.3 }}
      />
    </svg>
  );
}

/** Twisted-rope rule, echoing the cord on the crest. */
export function RopeRule({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 12" preserveAspectRatio="none" aria-hidden>
      <defs>
        <pattern id="rope" width="12" height="12" patternUnits="userSpaceOnUse">
          <path d="M0 10 L6 2 M6 10 L12 2" stroke="#c9a45c" strokeWidth="2" strokeLinecap="round" />
        </pattern>
      </defs>
      <rect width="240" height="12" fill="url(#rope)" opacity=".85" />
    </svg>
  );
}

/** Small diamond ornament divider. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-16 bg-current opacity-40" />
      <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 0L14 7 7 14 0 7z" fill="none" stroke="currentColor" /><circle cx="7" cy="7" r="1.6" fill="currentColor" /></svg>
      <span className="h-px w-16 bg-current opacity-40" />
    </div>
  );
}
