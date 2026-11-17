"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Music2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { hasForm, isRsvpClosed } from "@/lib/site-state";
import { useNow } from "@/lib/time";
import { navLinks } from "./Nav";
import { RopeRule } from "./primitives";

/** Floating RSVP pill — appears after the hero, steps aside when the RSVP section is on screen. */
export function FloatingRsvp() {
  const [show, setShow] = useState(false);
  const now = useNow(60_000);
  useEffect(() => {
    const rsvp = document.getElementById("rsvp");
    let pastHero = false, rsvpVisible = false;
    const update = () => setShow(pastHero && !rsvpVisible);
    const onScroll = () => { pastHero = window.scrollY > window.innerHeight * 0.9; update(); };
    const io = new IntersectionObserver(([e]) => { rsvpVisible = e.isIntersecting; update(); }, { threshold: 0.15 });
    if (rsvp) io.observe(rsvp);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  if (isRsvpClosed(now)) return null;
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href="#rsvp"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="btn-gold fixed bottom-5 right-5 z-40 !px-5 !py-3.5 md:bottom-8 md:right-8"
        >
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-burgundy opacity-60 [animation-duration:2.5s]" /><span className="relative inline-flex h-2 w-2 rounded-full bg-burgundy" /></span>
          {hasForm ? "RSVP" : "RSVP Info"} <span className="hidden normal-case tracking-normal sm:inline">· by Nov 25</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/** Music toggle — rendered only when an audio file is configured. Always off by default. */
export function MusicToggle() {
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  if (!site.music.src) return null;
  const toggle = async () => {
    const a = ref.current; if (!a) return;
    if (on) { a.pause(); setOn(false); }
    else { a.volume = 0.35; try { await a.play(); setOn(true); } catch { setOn(false); } }
  };
  return (
    <>
      <audio ref={ref} src={site.music.src} loop preload="none" />
      <button
        type="button" onClick={toggle} aria-pressed={on}
        className="glass fixed bottom-5 left-5 z-40 flex h-12 items-center gap-3 px-4 text-gold-bright md:bottom-8 md:left-8"
        aria-label={on ? "Pause Christmas music" : "Play Christmas music"}
      >
        {on ? <Music2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        <span className="flex h-4 items-end gap-[3px]" aria-hidden>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className="w-[2px] bg-gold-bright" style={{ height: on ? undefined : 3, animation: on ? `eq 1s ${i * 0.15}s ease-in-out infinite alternate` : "none" }} />
          ))}
        </span>
        <style>{`@keyframes eq{from{height:3px}to{height:16px}}`}</style>
      </button>
    </>
  );
}

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-night pt-24" aria-label="Footer">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-12 border-b border-gold/15 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src="/brand/crest-400.webp" alt="Odutola family crest" width={400} height={401} className="h-auto w-24" />
            <p className="mt-8 font-serif text-3xl italic text-ivory" lang="yo">{site.motto.text}</p>
            <RopeRule className="mt-6 h-2.5 w-32" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/55">{site.host}</p>
          </div>
          <nav className="md:col-span-3" aria-label="Footer">
            <p className="eyebrow text-gold">Explore</p>
            <ul className="mt-5 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}><a href={l.href} className="text-ivory/70 transition-colors hover:text-gold-bright">{l.label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4">
            <p className="eyebrow text-gold">Save the dates</p>
            <p className="mt-5 font-display text-3xl text-ivory">{site.event.displayDates}</p>
            <p className="mt-2 text-ivory/60">RSVP by {site.rsvp.displayDeadline}</p>
            {site.social.length > 0 && (
              <ul className="mt-6 flex gap-5">
                {site.social.map((s) => (
                  <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="eyebrow text-ivory/70 hover:text-gold-bright">{s.label}</a></li>
                ))}
              </ul>
            )}
            <p className="mt-10 font-serif text-2xl italic text-gold-bright" lang="yo">Ẹ kú ọdún!</p>
            <p className="text-sm text-ivory/50">Season&rsquo;s greetings to every member of the family.</p>
          </div>
        </div>
      </div>
      <p aria-hidden className="select-none whitespace-nowrap text-center font-display text-[19vw] uppercase leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_rgba(201,164,92,.28)]">
        Odutola
      </p>
      <div className="mx-auto flex max-w-[1600px] flex-wrap justify-between gap-3 px-5 py-6 text-xs text-ivory/40 md:px-10">
        <span>© 2026 {site.host}</span>
        <span>Odutola Christmas MMXXVI</span>
      </div>
    </footer>
  );
}
