"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/config/site";
import { Reveal, SectionMark, SplitHeadline } from "./primitives";

const rings = [
  { label: "Those who came before", body: "The foundation we stand on — the love, sacrifice and values passed down to us." },
  { label: "Those gathered now", body: "Every branch of the family, home again at the same table, sharing the same season." },
  { label: "Those yet to come", body: "The children and grandchildren who will one day tell the stories we are making today." },
];

export default function Family() {
  const [active, setActive] = useState(1);
  return (
    <section id="family" className="paper relative overflow-hidden py-24 md:py-36" aria-labelledby="family-title">
      <div className="mx-auto grid max-w-[1600px] items-center gap-16 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionMark n="06" label="One Family · One Legacy" tone="ink" />
          <SplitHeadline as="h2" text="Rooted in love." className="mt-8 font-display text-[clamp(2.6rem,6.6vw,6.6rem)] uppercase leading-[0.9] tracking-[-0.03em] text-ink" />
          <SplitHeadline as="p" text="United by family." delay={0.2} className="font-serif text-[clamp(2.8rem,7vw,7rem)] font-medium italic leading-[0.95] text-emerald" />

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-xl font-serif text-2xl leading-snug text-ink">
              A family is not only who we are today. It is everyone who made today possible, and everyone who will carry it forward.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
              We gather each Christmas in honour of the family of <strong className="font-semibold text-ink">{site.patriarch}</strong> — grandparents and grandchildren, aunties and uncles, cousins near and far. Different homes, different cities, different chapters of life, but one name, one table and one story that we keep writing together.
            </p>
          </Reveal>

          <ul className="mt-10 border-t border-ink/15">
            {rings.map((r, i) => (
              <li key={r.label} className="border-b border-ink/15">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  className="flex w-full items-baseline gap-5 py-5 text-left"
                >
                  <span className={`font-display text-sm transition-colors ${active === i ? "text-gold-deep" : "text-ink/30"}`}>0{i + 1}</span>
                  <span className="flex-1">
                    <span className={`block font-display text-2xl transition-colors md:text-3xl ${active === i ? "text-ink" : "text-ink/40"}`}>{r.label}</span>
                    <motion.span
                      initial={false}
                      animate={{ height: active === i ? "auto" : 0, opacity: active === i ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="block overflow-hidden"
                    >
                      <span className="block pt-2 text-ink/65">{r.body}</span>
                    </motion.span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Generations — concentric rings around the crest */}
        <Reveal className="relative mx-auto aspect-square w-full max-w-[620px] lg:col-span-6" y={40}>
          {[1, 0.74, 0.5].map((s, i) => {
            const ringIndex = i; // outer ring = those before, middle = now, inner = yet to come
            const on = active === ringIndex;
            return (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2 rounded-full border"
                style={{ width: `${s * 100}%`, height: `${s * 100}%`, x: "-50%", y: "-50%" }}
                animate={{ borderColor: on ? "rgba(143,111,47,.9)" : "rgba(28,20,17,.14)", scale: on ? 1.015 : 1 }}
                transition={{ duration: 0.8 }}
              >
                <motion.span
                  className="eyebrow absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-ivory px-3 text-[0.6rem]"
                  animate={{ color: on ? "#6a1528" : "rgba(28,20,17,.4)" }}
                >
                  {rings[ringIndex].label}
                </motion.span>
                <div className={`absolute inset-0 rounded-full ${i % 2 ? "spin-slower-rev" : "spin-slow"}`}>
                  <span className="absolute -top-1 left-[22%] h-2 w-2 rounded-full bg-gold-deep/70" />
                  <span className="absolute bottom-[12%] right-[2%] h-1.5 w-1.5 rounded-full bg-burgundy/60" />
                </div>
              </motion.div>
            );
          })}
          <div className="absolute left-1/2 top-1/2 flex aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-night shadow-[0_30px_80px_-20px_rgba(28,20,17,.6)]">
            <Image src="/brand/crest-400.webp" alt="" width={400} height={401} className="h-auto w-[78%]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
