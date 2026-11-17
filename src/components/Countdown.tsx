"use client";

import { AnimatePresence, motion } from "framer-motion";
import { remainingUntil, useNow } from "@/lib/time";

function Digit({ value }: { value: string }) {
  return (
    <span className="relative inline-block overflow-hidden" style={{ width: "0.62em", height: "1em" }}>
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={value}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Unit({ value, label, pad = 2, size }: { value: number | null; label: string; pad?: number; size: string }) {
  const str = value === null ? "–".repeat(pad) : String(value).padStart(pad, "0");
  return (
    <div className="flex flex-col items-center">
      <span className={`font-display leading-none tabular-nums ${size}`} aria-hidden>
        {str.split("").map((c, i) => <Digit key={i + str.length * 10} value={c} />)}
      </span>
      <span className="eyebrow mt-3 text-[0.55rem] !tracking-[0.2em] text-gold/80 sm:text-[0.6rem] sm:!tracking-[0.32em]">{label}</span>
    </div>
  );
}

export default function Countdown({
  target, size = "text-6xl md:text-8xl", separator = true, className = "", doneLabel,
}: { target: string; size?: string; separator?: boolean; className?: string; doneLabel?: string }) {
  const now = useNow();
  const r = now === null ? null : remainingUntil(target, now);

  if (r?.done && doneLabel) {
    return <p className={`font-display italic ${size} ${className}`}>{doneLabel}</p>;
  }

  const sr = r ? `${r.days} days, ${r.hours} hours, ${r.minutes} minutes remaining` : "Calculating time remaining";
  const units: [number | null, string, number][] = [
    [r?.days ?? null, "Days", r && r.days > 99 ? 3 : 2],
    [r?.hours ?? null, "Hours", 2],
    [r?.minutes ?? null, "Minutes", 2],
    [r?.seconds ?? null, "Seconds", 2],
  ];
  return (
    <div className={`flex items-start justify-center gap-5 sm:gap-6 md:gap-10 ${className}`} role="timer" aria-label={sr}>
      {units.map(([v, l, p], i) => (
        <div key={l} className="flex items-start gap-5 sm:gap-6 md:gap-10">
          <Unit value={v} label={l} pad={p} size={size} />
          {separator && i < units.length - 1 && (
            <span className={`hidden font-display leading-none text-gold/40 sm:inline ${size}`} aria-hidden>·</span>
          )}
        </div>
      ))}
    </div>
  );
}
