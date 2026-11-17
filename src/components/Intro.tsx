"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { createContext, useContext, useEffect, useState } from "react";

const IntroCtx = createContext(false);
export const useIntroDone = () => useContext(IntroCtx);

/**
 * Custom loader: the crest surfaces from darkness, a gold thread draws across,
 * and the curtain lifts. Plays once per browser session; skipped for reduced motion.
 */
export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("oc26-intro") === "1"; } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) { setShow(false); setDone(true); return; }
    const t = setTimeout(() => {
      setShow(false);
      try { sessionStorage.setItem("oc26-intro", "1"); } catch {}
    }, 1900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
  }, [show]);

  return (
    <IntroCtx.Provider value={done}>
      <AnimatePresence onExitComplete={() => setDone(true)}>
        {show && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-night grain"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            initial={{ clipPath: "inset(0 0 0% 0)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            aria-label="Loading Odutola Christmas 2026"
            role="status"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(106,21,40,.45),transparent_60%)]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.86, filter: "blur(18px) brightness(.4)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-36 sm:w-44"
            >
              <Image src="/brand/crest-400.webp" alt="" width={400} height={401} priority className="h-auto w-full drop-shadow-[0_0_40px_rgba(234,208,143,.35)]" />
            </motion.div>
            <motion.div
              className="relative mt-10 h-px w-56 origin-left bg-gradient-to-r from-transparent via-gold-bright to-transparent"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
            />
            <motion.p
              className="eyebrow relative mt-6 text-gold"
              initial={{ opacity: 0, letterSpacing: "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.32em" }}
              transition={{ duration: 1.6, delay: 0.4 }}
            >
              Odutola · Christmas · MMXXVI
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </IntroCtx.Provider>
  );
}
