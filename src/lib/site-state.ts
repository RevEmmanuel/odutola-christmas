import { site } from "@/config/site";

export const formUrl = site.rsvp.googleFormUrl.trim();
export const hasForm = formUrl.length > 0;

export function isRsvpClosed(now: number | null): boolean {
  if (site.rsvp.forceClosed) return true;
  if (now === null) return false;
  return now > new Date(site.rsvp.deadline).getTime();
}

/** Resolve a photo/film source from either a local path or a Google Drive file id. */
export function drivePhoto(id: string, width = 1600) {
  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${width}`;
}
export function photoSrc(p: { src?: string; driveId?: string }): string | null {
  if (p.src) return p.src;
  if (p.driveId) return drivePhoto(p.driveId);
  return null;
}

/** All-day calendar file for the three days (no venue invented — added only if configured). */
export function icsHref(): string {
  const loc = [site.info.venue, site.info.city].filter(Boolean).join(", ");
  const lines = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Odutola Christmas//EN", "BEGIN:VEVENT",
    "UID:odutola-christmas-2026@odutola", "DTSTAMP:20261101T000000Z",
    "DTSTART;VALUE=DATE:20261224", "DTEND;VALUE=DATE:20261227",
    `SUMMARY:${site.name}`,
    `DESCRIPTION:${site.hero.tagline} Hosted by ${site.host}.`,
    ...(loc ? [`LOCATION:${loc}`] : []),
    "END:VEVENT", "END:VCALENDAR",
  ];
  return "data:text/calendar;charset=utf-8," + encodeURIComponent(lines.join("\r\n"));
}
