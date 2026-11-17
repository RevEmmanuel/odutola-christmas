"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { site } from "@/config/site";
import { Reveal, SectionMark, SplitHeadline } from "./primitives";

const tones = [
  { bg: "bg-emerald", text: "text-ivory", accent: "text-gold-bright", line: "border-gold/30", glow: "rgba(234,208,143,.18)" },
  { bg: "bg-burgundy", text: "text-ivory", accent: "text-gold-bright", line: "border-gold/35", glow: "rgba(255,226,160,.28)" },
  { bg: "bg-cream", text: "text-ink", accent: "text-burgundy", line: "border-ink/20", glow: "rgba(201,164,92,.3)" },
];

export default function Programme() {
  const [active, setActive] = useState(1);
  return (
    <section id="programme" className="grain relative overflow-hidden bg-night py-24 md:py-36" aria-labelledby="programme-title">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <SectionMark n="02" label="The Programme" />
            <SplitHeadline as="h2" text="Three Days of Celebration." className="mt-8 max-w-4xl font-display text-[clamp(2.6rem,6.5vw,6.4rem)] uppercase leading-[0.92] tracking-[-0.03em] text-ivory" />
          </div>
          <Reveal className="max-w-sm">
            <p className="text-ivory/65">
              Each day carries its own spirit. The full programme is being finalised by the planning committee and will appear here as soon as it is confirmed.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 flex flex-col gap-4 lg:h-[640px] lg:flex-row">
          {site.programme.map((d, i) => {
            const t = tones[i % tones.length];
            const isActive = active === i;
            return (
              <motion.article
                key={d.day}
                layout
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                aria-labelledby={`day-${d.day}`}
                transition={{ layout: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
                className={`@container relative isolate flex min-h-[520px] flex-col overflow-hidden p-7 outline-none md:p-10 lg:min-h-0 ${t.bg} ${t.text} ${isActive ? "lg:flex-[1.7]" : "lg:flex-1"}`}
                style={{ boxShadow: `inset 0 0 120px ${t.glow}` }}
              >
                <div className="adire pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" />
                <div className="flex items-start justify-between">
                  <span className={`eyebrow ${t.accent}`}>Day {d.day}</span>
                  <span className="eyebrow opacity-60">{d.weekday}</span>
                </div>

                <span aria-hidden className={`pointer-events-none absolute -right-4 top-10 font-display text-[13rem] leading-none opacity-[0.09] md:text-[17rem]`}>{d.day}</span>

                <div className="mt-auto">
                  <p className={`font-serif text-xl italic ${t.accent}`}>{d.date}</p>
                  <h3 id={`day-${d.day}`} className="mt-2 font-display text-[clamp(1.8rem,11.5cqw,3.8rem)] uppercase leading-[0.95] tracking-[-0.02em]">{d.name}</h3>
                  <p className="mt-3 font-serif text-xl italic opacity-80">{d.line}</p>

                  <div className={`mt-8 border-t pt-6 ${t.line}`}>
                    {d.items.length > 0 ? (
                      <ul className="space-y-3">
                        {d.items.map((it, k) => (
                          <li key={k} className="flex gap-4">
                            {it.time && <span className={`w-20 shrink-0 font-display ${t.accent}`}>{it.time}</span>}
                            <span>
                              <span className="font-semibold">{it.title}</span>
                              {it.kind && <span className="eyebrow ml-3 opacity-60">{it.kind}</span>}
                              {it.note && <span className="block text-sm opacity-70">{it.note}</span>}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <>
                        <p className="eyebrow mb-4 opacity-60">Programme to be announced</p>
                        <ul className="flex flex-wrap gap-2">
                          {site.programmeSlots.map((s) => (
                            <li key={s} className={`border px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] ${t.line} opacity-80`}>
                              {s} <span className="opacity-60">· TBA</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
