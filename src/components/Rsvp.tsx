"use client";

import { CalendarPlus, Info } from "lucide-react";
import { site } from "@/config/site";
import { hasForm, icsHref, isRsvpClosed } from "@/lib/site-state";
import { useNow } from "@/lib/time";
import Countdown from "./Countdown";
import { EyeOutline, Reveal, SectionMark, SplitHeadline } from "./primitives";
import RsvpButton from "./RsvpButton";

const tba = (v: string) => v.trim() || "To be announced";

export default function Rsvp() {
  const now = useNow(30_000);
  const closed = isRsvpClosed(now);
  const info = site.info;
  const contact = [info.contactName, info.contactPhone, info.contactEmail].filter(Boolean).join(" · ");

  return (
    <section id="rsvp" className="grain relative isolate overflow-hidden bg-emerald py-24 md:py-36" aria-labelledby="rsvp-title">
      <div className="adire pointer-events-none absolute inset-0 -z-10 opacity-[0.07]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,rgba(234,208,143,.18),transparent_55%),radial-gradient(ellipse_at_0%_100%,rgba(10,18,15,.7),transparent_60%)]" />
      <EyeOutline className="pointer-events-none absolute -right-[20%] top-1/2 -z-10 w-[90%] -translate-y-1/2 text-gold/15" />

      <div className="mx-auto grid max-w-[1600px] gap-14 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionMark n="07" label="Attendance Confirmation" />
          {closed ? (
            <>
              <SplitHeadline as="h2" id="rsvp-title" text="RSVPs are now closed." className="mt-8 font-display text-[clamp(2.6rem,6.4vw,6.2rem)] uppercase leading-[0.92] tracking-[-0.03em] text-ivory" />
              <Reveal><p className="mt-8 max-w-xl font-serif text-2xl italic text-gold-bright">{site.rsvp.closedMessage}</p></Reveal>
            </>
          ) : (
            <>
              <h2 id="rsvp-title" className="sr-only">Save your seat. Be part of the memories.</h2>
              <SplitHeadline as="p" text="Save your seat." className="mt-8 font-display text-[clamp(2.8rem,7vw,7rem)] uppercase leading-[0.9] tracking-[-0.03em] text-ivory" />
              <SplitHeadline as="p" text="Be part of the memories." delay={0.2} className="foil font-serif text-[clamp(2.4rem,5.6vw,5.6rem)] font-medium italic leading-[1]" />
              <Reveal delay={0.2}>
                <p className="mt-10 max-w-xl text-lg leading-relaxed text-ivory/80">
                  Christmas is better when we&rsquo;re together. Let us know you&rsquo;re coming as we prepare to make Odutola Christmas 2026 unforgettable.
                </p>
              </Reveal>
              <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-4">
                <RsvpButton />
                <a href={icsHref()} download="odutola-christmas-2026.ics" className="btn-ghost">
                  <CalendarPlus className="h-4 w-4" aria-hidden /> Add to Calendar
                </a>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="mt-6 flex max-w-xl items-start gap-2 text-sm text-ivory/60">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {hasForm
                    ? "The button opens our RSVP form in a new tab. Your attendance is confirmed once you submit the form."
                    : "The RSVP form link is being finalised and will be live here shortly."}
                </p>
              </Reveal>
            </>
          )}
        </div>

        <Reveal className="lg:col-span-5" delay={0.15}>
          <div className="glass relative p-7 md:p-10">
            <p className="eyebrow text-gold">{closed ? "Deadline passed" : "Kindly respond by"}</p>
            <p className="mt-3 font-display text-4xl text-ivory md:text-5xl">{site.rsvp.displayDeadline}</p>
            {!closed && (
              <>
                <div className="hairline my-8" />
                <p className="eyebrow mb-5 text-ivory/60">Time left to RSVP</p>
                <Countdown target={site.rsvp.deadline} size="text-4xl md:text-5xl" separator={false} className="!justify-between text-gold-bright" />
              </>
            )}
            <div className="hairline my-8" />
            <dl className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm">
              <div className="col-span-2">
                <dt className="eyebrow text-gold/80">Celebration</dt>
                <dd className="mt-1 font-serif text-2xl italic text-ivory">{site.event.displayDates}</dd>
              </div>
              <div>
                <dt className="eyebrow text-gold/80">Venue</dt>
                <dd className="mt-1 text-ivory/80">{tba([info.venue, info.city].filter(Boolean).join(", "))}</dd>
              </div>
              <div>
                <dt className="eyebrow text-gold/80">Dress Code</dt>
                <dd className="mt-1 text-ivory/80">{tba(info.dressCode)}</dd>
              </div>
              <div className="col-span-2">
                <dt className="eyebrow text-gold/80">Enquiries</dt>
                <dd className="mt-1 text-ivory/80">{tba(contact)}</dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
