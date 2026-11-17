"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/config/site";
import Countdown from "./Countdown";
import { EyeOutline, Ornament, Reveal, RopeRule, SectionMark, SplitHeadline } from "./primitives";

/* ---------------------------------------------------------------- Countdown */
export function CountdownSection() {
  return (
    <section id="countdown" className="grain relative overflow-hidden border-y border-gold/15 bg-night-2 py-24 md:py-32" aria-labelledby="countdown-title">
      <EyeOutline className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-none -translate-x-1/2 -translate-y-1/2 text-gold/10 md:w-[90%]" />
      <div className="relative mx-auto max-w-6xl px-5 text-center">
        <Reveal><p className="eyebrow text-gold">The Countdown</p></Reveal>
        <Reveal delay={0.1}>
          <h2 id="countdown-title" className="mt-4 font-serif text-3xl italic text-ivory/85 md:text-4xl">Until we gather on Christmas Eve</h2>
        </Reveal>
        <Reveal delay={0.2} className="mt-12 md:mt-16">
          <Countdown target={site.event.start} size="text-[3rem] sm:text-7xl md:text-8xl lg:text-[9rem]" className="foil-digits text-ivory" doneLabel="Merry Christmas — the celebration is here." />
        </Reveal>
        <Reveal delay={0.3}><Ornament className="mt-14 text-gold" /></Reveal>
        <Reveal delay={0.35}><p className="eyebrow mt-6 text-ivory/60">Thursday 24 — Saturday 26 December 2026</p></Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ The Celebration */
const emotions = ["Family", "Celebration", "Legacy", "Nostalgia", "Anticipation"];

export function About() {
  return (
    <section id="celebration" className="paper relative overflow-hidden" aria-labelledby="about-title">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 py-24 md:px-10 md:py-36 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionMark n="01" label="The Celebration" tone="ink" />
          <SplitHeadline
            as="h2" text="More than Christmas."
            className="mt-8 font-display text-[clamp(2.8rem,7.5vw,7.5rem)] uppercase leading-[0.9] tracking-[-0.03em] text-ink"
          />
          <SplitHeadline
            as="p" text="It's family." delay={0.25}
            className="font-serif text-[clamp(3rem,8.5vw,8.5rem)] font-medium italic leading-[0.9] text-burgundy"
          />
          <Reveal delay={0.2} className="mt-14 hidden lg:block">
            <div className="flex items-end gap-8">
              {site.programme.map((d) => (
                <div key={d.day} className="group">
                  <span className="block font-display text-[7rem] leading-none text-transparent transition-colors duration-700 [-webkit-text-stroke:1px_var(--color-burgundy)] group-hover:text-burgundy">
                    {d.date.split(" ")[1]}
                  </span>
                  <span className="eyebrow mt-2 block text-ink/60">{d.name}</span>
                </div>
              ))}
              <span className="mb-10 font-serif text-3xl italic text-gold-deep">December<br />2026</span>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col justify-end lg:col-span-5">
          <Reveal>
            <p className="font-serif text-2xl leading-snug text-ink md:text-[1.7rem]">
              <span className="float-left mr-3 mt-1 font-display text-[4.6rem] leading-[0.8] text-burgundy">E</span>
              very year, we create moments that remind us of what truly matters. The laughter, the conversations, the familiar faces, the shared meals, the stories and the memories that bring us closer.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-[1.02rem] leading-relaxed text-ink/75">
              Odutola Christmas 2026 is another opportunity to come together, celebrate our journey, reconnect across generations and create memories that will live with us for years to come.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 border-l-2 border-gold pl-5 font-serif text-xl italic text-burgundy">
              Three days of love, laughter, celebration and unforgettable family moments.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/15 pt-6">
            <span className="eyebrow text-ink/50">When</span>
            <span className="font-display text-xl text-ink">{site.event.displayDates}</span>
          </Reveal>
        </div>
      </div>

      {/* Five emotions — slow editorial ticker */}
      <div className="relative overflow-hidden border-y border-ink/10 bg-cream/60 py-5" aria-label={emotions.join(", ")}>
        <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-12 whitespace-nowrap" aria-hidden>
          {[...emotions, ...emotions, ...emotions, ...emotions].map((e, i) => (
            <span key={i} className="flex items-center gap-12 font-serif text-3xl italic text-ink/80 md:text-4xl">
              {e}
              <svg width="12" height="12" viewBox="0 0 14 14" className="text-gold-deep"><path d="M7 0L14 7 7 14 0 7z" fill="currentColor" /></svg>
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee{to{transform:translateX(-50%)}}`}</style>
    </section>
  );
}

/* ---------------------------------------------------------------- The Motto */
export function Motto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], reduce ? [1, 1, 1] : [0.92, 1, 1.04]);
  const glow = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.2, 1, 0.2]);

  return (
    <section ref={ref} className="grain relative isolate overflow-hidden bg-wine py-32 md:py-48" aria-labelledby="motto-title">
      <div className="adire pointer-events-none absolute inset-0 -z-10 opacity-[0.06]" />
      <motion.div style={{ opacity: glow }} className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(234,208,143,.22),transparent_60%)]" />
      <div className="relative mx-auto max-w-6xl px-5 text-center">
        <Reveal className="mx-auto w-20 md:w-24">
          <Image src="/brand/crest-400.webp" alt="" width={400} height={401} className="h-auto w-full opacity-90" />
        </Reveal>
        <Reveal delay={0.1}><p id="motto-title" className="eyebrow mt-8 text-gold">{site.motto.label}</p></Reveal>
        <motion.blockquote style={{ scale }} className="mt-10">
          <SplitHeadline
            as="p" text={site.motto.text} lang="yo"
            className="font-serif text-[clamp(2.6rem,7.6vw,7.4rem)] font-medium italic leading-[1.08] text-ivory"
          />
        </motion.blockquote>
        <Reveal delay={0.3}><RopeRule className="mx-auto mt-12 h-3 w-48" /></Reveal>
        {site.motto.translation && (
          <Reveal delay={0.4}><p className="mx-auto mt-8 max-w-2xl font-serif text-2xl italic text-gold-bright/90">“{site.motto.translation}”</p></Reveal>
        )}
        <Reveal delay={0.45}><p className="eyebrow mt-8 text-ivory/50">The House of {site.patriarch}</p></Reveal>
      </div>
    </section>
  );
}
