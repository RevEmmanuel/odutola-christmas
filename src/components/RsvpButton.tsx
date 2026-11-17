"use client";

import { ArrowUpRight } from "lucide-react";
import { formUrl, hasForm, isRsvpClosed } from "@/lib/site-state";
import { useNow } from "@/lib/time";

/**
 * The single source of truth for every "Confirm your attendance" button.
 * - Opens the Google Form in a new tab (we never collect data ourselves).
 * - Shows a disabled "link coming soon" state until the form URL is configured.
 * - Hides itself (or shows `closedFallback`) once RSVPs close.
 */
export default function RsvpButton({
  className = "btn-gold", label = "Confirm Your Attendance", closedFallback = null,
}: { className?: string; label?: string; closedFallback?: React.ReactNode }) {
  const now = useNow(30_000);
  if (isRsvpClosed(now)) return <>{closedFallback}</>;

  if (!hasForm) {
    return (
      <span className={className} aria-disabled="true" title="The RSVP form link will be added shortly">
        {label}
        <span className="normal-case tracking-normal font-medium opacity-70">· link coming soon</span>
      </span>
    );
  }
  return (
    <a href={formUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
      <ArrowUpRight className="h-4 w-4" aria-hidden />
      <span className="sr-only">(opens the RSVP form in a new tab)</span>
    </a>
  );
}
