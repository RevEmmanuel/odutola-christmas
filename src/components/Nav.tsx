"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/config/site";
import RsvpButton from "./RsvpButton";

export const navLinks = [
  { href: "#celebration", label: "The Celebration" },
  { href: "#programme", label: "Three Days" },
  { href: "#memories", label: "Memories" },
  { href: "#films", label: "Films" },
  { href: "#menu", label: "The Feast" },
  { href: "#family", label: "The Family" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border-color] duration-700 ${
          scrolled ? "border-b border-gold/15 bg-night/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-20 md:px-10" aria-label="Primary">
          <a href="#top" className="group flex items-center gap-3" aria-label={`${site.name} — back to top`}>
            <Image src="/brand/crest-400.webp" alt="" width={40} height={40} className="h-9 w-9 transition-transform duration-700 group-hover:rotate-[8deg] md:h-10 md:w-10" />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[0.95rem] tracking-[0.18em] text-ivory">ODUTOLA</span>
              <span className="mt-1 font-serif text-sm italic text-gold">Christmas MMXXVI</span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 xl:flex">
            {navLinks.slice(0, -1).map((l) => (
              <li key={l.href}>
                <a href={l.href} className="group relative py-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ivory/75 transition-colors hover:text-gold-bright">
                  {l.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="#rsvp" className="hidden border border-gold/50 px-4 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.24em] text-gold-bright transition-colors hover:bg-gold hover:text-night md:inline-block">
              RSVP by Nov 25
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center border border-gold/30 text-gold-bright xl:hidden"
              aria-label="Open menu" aria-expanded={open} aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog" aria-modal="true" aria-label="Site menu"
            className="fixed inset-0 z-[60] flex flex-col bg-wine grain"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="adire pointer-events-none absolute inset-0 opacity-[0.07]" />
            <div className="relative flex h-16 items-center justify-between px-5 md:h-20 md:px-10">
              <span className="eyebrow text-gold">Odutola Christmas 2026</span>
              <button type="button" onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center border border-gold/40 text-gold-bright" aria-label="Close menu" autoFocus>
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="relative flex flex-1 flex-col justify-center gap-1 px-6 md:px-16">
              {navLinks.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                  <a href={l.href} onClick={() => setOpen(false)} className="group flex items-baseline gap-5 py-1.5">
                    <span className="font-display text-sm text-gold/70">0{i + 1}</span>
                    <span className="font-display text-[clamp(2rem,8vw,4.5rem)] leading-[1.05] text-ivory transition-colors group-hover:text-gold-bright group-hover:italic">{l.label}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-gold/20 px-6 py-6 md:px-16">
              <span className="font-serif text-lg italic text-gold-bright">{site.event.displayDates}</span>
              <RsvpButton className="btn-gold" label="Confirm Attendance" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
