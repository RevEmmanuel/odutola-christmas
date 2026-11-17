"use client";

import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/config/site";
import Countdown from "./Countdown";
import { useIntroDone } from "./Intro";
import Particles from "./Particles";
import { EyeOutline } from "./primitives";
import RsvpButton from "./RsvpButton";

const silk = [0.22, 1, 0.36, 1] as const;

function Letters({ text, className, delay = 0, ready }: { text: string; className?: string; delay?: number; ready: boolean }) {
  const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } };
  const child: Variants = { hidden: { y: "105%" }, show: { y: "0%", transition: { duration: 1.25, ease: silk } } };
  return (
    <motion.span className={`block overflow-hidden ${className}`} variants={parent} initial="hidden" animate={ready ? "show" : "hidden"} aria-hidden>
      {text.split("").map((c, i) => (
        <motion.span key={i} variants={child} className="inline-block">{c === " " ? " " : c}</motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero() {
  const ready = useIntroDone();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const crestY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "28%"]);
  const crestScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.86]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const fadeIn = (d: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 1.1, ease: silk, delay: d * 0.6 },
  });

  return (
    <section ref={ref} id="top" className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night pt-20 md:pt-24" aria-labelledby="hero-title">
      {/* Atmosphere */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_72%_45%,rgba(106,21,40,.55),transparent_70%),radial-gradient(ellipse_50%_50%_at_10%_100%,rgba(14,69,53,.45),transparent_70%)]" />
      <Particles className="-z-10" />
      <div className="adire pointer-events-none absolute inset-0 -z-10 opacity-[0.035]" />

      {/* Top meta row */}
      <motion.div {...fadeIn(0.1)} className="relative mx-auto flex w-full max-w-[1600px] items-start justify-between gap-6 px-5 md:px-10">
        <p className="max-w-sm text-[0.8rem] leading-relaxed text-ivory/70">
          <span className="text-gold-bright">{site.host}</span> {site.hero.invitation}
        </p>
        <p className="eyebrow hidden text-right text-gold/80 md:block">Est. as a family tradition<br />Edition MMXXVI</p>
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 items-center gap-6 px-5 py-8 md:px-10 lg:grid-cols-12 lg:py-0">
        {/* Type */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 order-2 lg:order-1 lg:col-span-7">
          <h1 id="hero-title" className="sr-only">Odutola Christmas 2026 — {site.hero.tagline}</h1>
          <div className="font-display uppercase leading-[0.82] tracking-[-0.035em] text-ivory">
            <Letters ready={ready} delay={0.1} text="Odutola" className="whitespace-nowrap text-[clamp(3.6rem,17.5vw,6rem)] sm:text-[clamp(4rem,14vw,8rem)] lg:text-[clamp(5rem,9.4vw,10.5rem)]" />
          </div>
          <div className="-mt-[0.15em] flex items-end gap-4 pl-[4vw] sm:gap-8">
            <Letters ready={ready} delay={0.45} text="Christmas" className="foil font-serif text-[clamp(3.4rem,12vw,10.5rem)] font-medium italic leading-[0.95] tracking-[-0.02em]" />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-4">
            <Letters ready={ready} delay={0.8} text="2026" className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-none text-transparent [-webkit-text-stroke:1px_var(--color-gold)]" />
            <motion.div {...fadeIn(1.1)} className="flex flex-col gap-1 border-l border-gold/40 pl-6">
              <span className="eyebrow text-gold">{site.event.displayDates}</span>
              <span className="font-serif text-xl italic text-ivory/85 md:text-2xl">{site.hero.tagline}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Crest in the eye */}
        <motion.div style={{ y: crestY, scale: crestScale }} className="relative order-1 mx-auto w-full max-w-[460px] lg:order-2 lg:col-span-5 lg:max-w-none">
          <EyeOutline className="pointer-events-none absolute left-1/2 top-1/2 w-[165%] -translate-x-1/2 -translate-y-1/2 text-gold/35" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={ready ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
            transition={{ duration: 1.8, ease: silk, delay: 0.2 }}
            className="relative mx-auto w-[62%] max-w-[420px] sm:w-[52%] lg:w-[78%]"
          >
            <div className="absolute inset-[8%] rounded-full bg-gold/25 blur-[70px]" aria-hidden />
            <Image
              src="/brand/crest.webp" alt="The Odutola family crest: a lion resting beneath a palm, framed by an eye and crowned with a laurel wreath"
              width={1198} height={1200} priority sizes="(min-width:1024px) 34vw, 60vw"
              className="relative h-auto w-full drop-shadow-[0_20px_60px_rgba(0,0,0,.6)]"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div {...fadeIn(1.3)} className="relative mx-auto w-full max-w-[1600px] px-5 pb-8 md:px-10 md:pb-10">
        <div className="hairline mb-6" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <RsvpButton closedFallback={<a href="#rsvp" className="btn-gold">Event Information</a>} />
            <a href="#memories" className="btn-ghost">Explore Our Memories</a>
          </div>
          <div className="flex items-center gap-6">
            <span className="eyebrow hidden text-gold/70 sm:block">Until<br />Christmas Eve</span>
            <Countdown target={site.event.start} size="text-2xl sm:text-3xl md:text-4xl" separator={false} className="!justify-start !gap-4 sm:!gap-6 text-ivory" doneLabel="The celebration is here." />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
