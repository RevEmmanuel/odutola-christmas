"use client";

import { Clapperboard, Play } from "lucide-react";
import { useState } from "react";
import { site } from "@/config/site";
import type { Film } from "@/config/types";
import { Reveal, SectionMark, SplitHeadline } from "./primitives";

const hasSource = (f: Film) => Boolean(f.src || f.youtubeId || f.driveId);

function Player({ film }: { film: Film }) {
  if (film.src) {
    return <video className="h-full w-full bg-black object-contain" src={film.src} poster={film.poster} controls autoPlay playsInline preload="metadata" />;
  }
  const embed = film.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${film.youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : `https://drive.google.com/file/d/${film.driveId}/preview`;
  return <iframe className="h-full w-full" src={embed} title={film.title} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen loading="lazy" />;
}

function FilmFrame({ film, index, large = false }: { film: Film; index: number; large?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const ready = hasSource(film);
  const poster = film.poster || (film.youtubeId ? `https://i.ytimg.com/vi/${film.youtubeId}/maxresdefault.jpg` : undefined);

  return (
    <figure className="group">
      <div className={`relative aspect-video overflow-hidden border border-gold/20 bg-black ${large ? "" : ""}`}>
        {playing && ready ? (
          <Player film={film} />
        ) : ready ? (
          <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 flex items-center justify-center" aria-label={`Play film: ${film.title}`}>
            {poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-[1.6s] group-hover:scale-105" />
            )}
            <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30" />
            <span className={`relative flex items-center justify-center rounded-full border border-gold-bright/70 bg-black/30 backdrop-blur-md transition-transform duration-700 group-hover:scale-110 ${large ? "h-24 w-24" : "h-16 w-16"}`}>
              <Play className={`${large ? "h-8 w-8" : "h-5 w-5"} translate-x-0.5 fill-gold-bright text-gold-bright`} />
            </span>
          </button>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,#1a1512,#000_75%)]">
            <div className="absolute inset-x-0 top-0 h-[9%] bg-black" />
            <div className="absolute inset-x-0 bottom-0 h-[9%] bg-black" />
            <Clapperboard className={`${large ? "h-9 w-9" : "h-6 w-6"} text-gold/60`} aria-hidden />
            <p className="eyebrow mt-4 text-gold/80">Video placeholder</p>
            <p className="mt-1 font-serif text-lg italic text-ivory/50">Film {String(index + 1).padStart(2, "0")} · to be supplied</p>
          </div>
        )}
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-b border-gold/15 pb-4">
        <span className={`font-display text-ivory ${large ? "text-2xl md:text-3xl" : "text-xl"}`}>{film.title}</span>
        <span className="eyebrow text-gold/70">{[film.year, film.duration].filter(Boolean).join(" · ") || "Coming soon"}</span>
      </figcaption>
    </figure>
  );
}

export default function Films() {
  const feature = site.films.find((f) => f.feature) ?? site.films[0];
  const rest = site.films.filter((f) => f !== feature);
  return (
    <section id="films" className="grain relative overflow-hidden bg-black py-24 md:py-36" aria-labelledby="films-title">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(106,21,40,.35),transparent_60%)]" />
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="text-center">
          <div className="flex justify-center"><SectionMark n="04" label="The Screening Room" /></div>
          <SplitHeadline as="h2" text="The Memories." className="mt-8 font-display text-[clamp(2.4rem,6vw,6rem)] uppercase leading-[0.95] tracking-[-0.02em] text-ivory" />
          <SplitHeadline as="p" text="The Moments." delay={0.15} className="font-display text-[clamp(2.4rem,6vw,6rem)] uppercase leading-[0.95] tracking-[-0.02em] text-transparent [-webkit-text-stroke:1px_var(--color-gold)]" />
          <SplitHeadline as="p" text="The Magic." delay={0.3} className="foil font-serif text-[clamp(2.8rem,7vw,7rem)] font-medium italic leading-[0.95]" />
        </div>

        {feature && (
          <Reveal className="mx-auto mt-16 max-w-6xl md:mt-24">
            <FilmFrame film={feature} index={site.films.indexOf(feature)} large />
          </Reveal>
        )}
        {rest.length > 0 && (
          <div className="mx-auto mt-10 grid max-w-6xl gap-8 md:grid-cols-2">
            {rest.map((f, i) => (
              <Reveal key={i} delay={i * 0.1}><FilmFrame film={f} index={site.films.indexOf(f)} /></Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
