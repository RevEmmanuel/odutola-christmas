"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { site } from "@/config/site";
import type { Photo } from "@/config/types";
import { photoSrc } from "@/lib/site-state";
import { Reveal, SectionMark, SplitHeadline } from "./primitives";

const shapeClass: Record<Photo["shape"], string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

function Placeholder({ year, index }: { year: string; index: number }) {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-cream text-ink/55">
      <div className="absolute inset-3 border border-dashed border-gold-deep/40" />
      <div className="adire absolute inset-0 opacity-[0.12]" />
      <ImageIcon className="relative h-6 w-6 text-gold-deep/70" aria-hidden />
      <p className="eyebrow relative mt-3 text-[0.6rem]">Photograph placeholder</p>
      <p className="relative mt-1 font-serif text-sm italic">{year} · Frame {String(index + 1).padStart(2, "0")}</p>
    </div>
  );
}

export default function Memories() {
  const years = site.memories;
  const [yearIdx, setYearIdx] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const current = years[yearIdx];

  const realPhotos = useMemo(
    () => current.photos.map((p, i) => ({ ...p, i, url: photoSrc(p) })).filter((p) => p.url) as (Photo & { i: number; url: string })[],
    [current],
  );
  const allPlaceholders = realPhotos.length === 0;

  return (
    <section id="memories" className="paper relative overflow-hidden py-24 md:py-36" aria-labelledby="memories-title">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionMark n="03" label="Our Christmas Through the Years" tone="ink" />
            <SplitHeadline as="h2" text="Every picture tells a story." className="mt-8 font-display text-[clamp(2.6rem,7vw,7rem)] uppercase leading-[0.9] tracking-[-0.03em] text-ink" />
          </div>
          <Reveal className="self-end lg:col-span-4">
            <p className="font-serif text-xl italic leading-snug text-burgundy md:text-2xl">
              “From the moments we&rsquo;ve shared to the memories we continue to create, every Christmas holds a special place in our family&rsquo;s story.”
            </p>
          </Reveal>
        </div>

        {/* Year selector */}
        <div className="mt-16 flex items-end gap-2 overflow-x-auto border-b border-ink/15 no-scrollbar" role="tablist" aria-label="Choose a year">
          {years.map((y, i) => (
            <button
              key={y.year}
              role="tab"
              aria-selected={i === yearIdx}
              aria-controls="memories-panel"
              onClick={() => setYearIdx(i)}
              className={`relative shrink-0 px-4 pb-4 font-display text-4xl transition-colors duration-500 md:px-6 md:text-6xl ${i === yearIdx ? "text-burgundy" : "text-ink/25 hover:text-ink/60"}`}
            >
              {y.year}
              {i === yearIdx && <motion.span layoutId="year-underline" className="absolute inset-x-4 -bottom-px h-[3px] bg-gold md:inset-x-6" />}
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-serif text-2xl italic text-ink">{current.title}</p>
          {current.note && <p className="text-sm text-ink/60">{current.note}</p>}
        </div>
        {allPlaceholders && (
          <p className="mt-4 inline-flex items-center gap-2 border border-gold-deep/40 bg-cream px-4 py-2 text-xs uppercase tracking-[0.18em] text-ink/70">
            <ImageIcon className="h-3.5 w-3.5" aria-hidden /> Placeholder frames — the family&rsquo;s photographs will appear here once supplied
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.ul
            key={current.year}
            id="memories-panel"
            role="tabpanel"
            className="mt-10 grid auto-rows-[150px] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[200px] md:grid-cols-4 md:gap-4 lg:auto-rows-[240px]"
            initial="hidden" animate="show" exit="exit"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } }, exit: { opacity: 0, transition: { duration: 0.3 } } }}
          >
            {current.photos.map((p, i) => {
              const url = photoSrc(p);
              const realIndex = realPhotos.findIndex((r) => r.i === i);
              return (
                <motion.li
                  key={i}
                  className={`group relative overflow-hidden ${shapeClass[p.shape]}`}
                  variants={{ hidden: { opacity: 0, y: 30, clipPath: "inset(12% 0 0 0)" }, show: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)", transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } } }}
                >
                  {url ? (
                    <button type="button" onClick={() => setLightbox(realIndex)} className="relative block h-full w-full" aria-label={`Open photo: ${p.caption || p.alt || `${current.year} photo ${i + 1}`}`}>
                      <Image src={url} alt={p.alt} fill loading="lazy" sizes="(min-width:768px) 25vw, 50vw" className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]" />
                      <span className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                      {p.caption && <span className="absolute inset-x-4 bottom-4 translate-y-3 text-left font-serif text-lg italic text-ivory opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">{p.caption}</span>}
                    </button>
                  ) : (
                    <Placeholder year={current.year} index={i} />
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        </AnimatePresence>
      </div>

      <Lightbox photos={realPhotos} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} year={current.year} />
    </section>
  );
}

function Lightbox({
  photos, index, onClose, onIndex, year,
}: { photos: (Photo & { url: string })[]; index: number | null; onClose: () => void; onIndex: (i: number) => void; year: string }) {
  const open = index !== null && photos[index];
  const go = useCallback((dir: 1 | -1) => {
    if (index === null) return;
    onIndex((index + dir + photos.length) % photos.length);
  }, [index, photos.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, go, onClose]);

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-night/95 backdrop-blur-md"
          role="dialog" aria-modal="true" aria-label="Photo viewer"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-10">
            <span className="eyebrow text-gold">{year} · {index + 1} / {photos.length}</span>
            <button type="button" onClick={onClose} className="flex h-11 w-11 items-center justify-center border border-gold/40 text-gold-bright" aria-label="Close photo viewer" autoFocus>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 md:px-20">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                className="relative flex h-full w-full flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                drag={photos.length > 1 ? "x" : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.3}
                onDragEnd={(_, info) => { if (info.offset.x < -80) go(1); else if (info.offset.x > 80) go(-1); }}
              >
                <div className="relative h-[70vh] w-full">
                  <Image src={photos[index].url} alt={photos[index].alt} fill sizes="100vw" className="object-contain" />
                </div>
                {photos[index].caption && <figcaption className="mt-5 text-center font-serif text-xl italic text-ivory/85">{photos[index].caption}</figcaption>}
              </motion.figure>
            </AnimatePresence>
            {photos.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-gold/30 bg-night/60 text-gold-bright md:left-6" aria-label="Previous photo"><ChevronLeft className="h-5 w-5" /></button>
                <button type="button" onClick={() => go(1)} className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center border border-gold/30 bg-night/60 text-gold-bright md:right-6" aria-label="Next photo"><ChevronRight className="h-5 w-5" /></button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
