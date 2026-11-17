"use client";

import Image from "next/image";
import { site } from "@/config/site";
import { Ornament, Reveal, SectionMark, SplitHeadline } from "./primitives";

/** Menu designed as a printed dinner card. Items render once added to config. */
export default function Feast() {
  const cats = site.menu.categories;
  const anyItems = cats.some((c) => c.items.length > 0);
  const half = Math.ceil(cats.length / 2);

  return (
    <section id="menu" className="grain relative overflow-hidden bg-night py-24 md:py-36" aria-labelledby="menu-title">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(14,69,53,.5),transparent_55%),radial-gradient(ellipse_at_10%_90%,rgba(106,21,40,.4),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-[1600px] gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <SectionMark n="05" label="The Christmas Menu" />
          <SplitHeadline as="h2" text="A feast worth looking forward to." className="mt-8 font-display text-[clamp(2.4rem,5vw,4.8rem)] uppercase leading-[0.95] tracking-[-0.02em] text-ivory" />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-sm text-ivory/65">
              Food has always been at the heart of our Christmas table. The official menu is being prepared with care, and every dish will be revealed here.
            </p>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-8" y={50}>
          {/* The card */}
          <div className="relative bg-ivory p-2 text-ink shadow-[0_40px_120px_-30px_rgba(0,0,0,.8)] md:p-3">
            <div className="relative border border-gold-deep/50 p-7 md:p-14">
              <div className="pointer-events-none absolute inset-2 border border-gold-deep/25" />
              <header className="relative text-center">
                <Image src="/brand/crest-400.webp" alt="" width={400} height={401} className="mx-auto h-auto w-16 rounded-full bg-night p-1.5" />
                <p className="eyebrow mt-5 text-burgundy">Odutola Christmas · MMXXVI</p>
                <h3 className="mt-3 font-serif text-5xl italic md:text-6xl">Le Menu</h3>
                <Ornament className="mt-5 text-gold-deep" />
                {!anyItems && <p className="mx-auto mt-5 max-w-md font-serif text-lg italic text-ink/70">{site.menu.status}</p>}
              </header>

              <div className="relative mt-12 grid gap-x-14 gap-y-10 md:grid-cols-2">
                {[cats.slice(0, half), cats.slice(half)].map((col, ci) => (
                  <div key={ci} className="space-y-10">
                    {col.map((c, k) => (
                      <div key={c.name} className="group">
                        <div className="flex items-baseline gap-3">
                          <span className="font-display text-sm text-gold-deep">{String(ci * half + k + 1).padStart(2, "0")}</span>
                          <h4 className="eyebrow text-[0.72rem] text-burgundy">{c.name}</h4>
                        </div>
                        {c.items.length > 0 ? (
                          <ul className="mt-4 space-y-4">
                            {c.items.map((it) => (
                              <li key={it.name}>
                                <div className="flex items-baseline gap-2">
                                  <span className="font-serif text-xl font-semibold">{it.name}</span>
                                  {it.tag && <span className="eyebrow text-[0.55rem] text-gold-deep">{it.tag}</span>}
                                </div>
                                {it.description && <p className="text-sm text-ink/65">{it.description}</p>}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="mt-4 flex items-center gap-3 text-ink/45">
                            <span className="font-serif text-lg italic">To be revealed</span>
                            <span className="h-px flex-1 border-b border-dotted border-ink/30" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <footer className="relative mt-14 text-center">
                <Ornament className="text-gold-deep" />
                <p className="mt-4 font-serif text-base italic text-ink/60">Odutola Christmas · {site.event.displayDates}</p>
              </footer>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
