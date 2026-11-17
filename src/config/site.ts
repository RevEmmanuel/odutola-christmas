/**
 * ============================================================================
 *  ODUTOLA CHRISTMAS 2026 — CENTRAL CONFIGURATION
 * ============================================================================
 *  Every date, link, photo, video, menu item and programme entry on the site
 *  is read from this one file. Components never hardcode event content.
 *
 *  Quick checklist before launch:
 *   [ ] rsvp.googleFormUrl          ← paste the Google Form link
 *   [ ] memories[].photos           ← add photos (see /public/memories/README.md)
 *   [ ] films                       ← add video montages
 *   [ ] menu[].items                ← add dishes once the menu is final
 *   [ ] programme[].items           ← add activities once the programme is final
 *   [ ] info.venue / dressCode ...  ← fill in event details
 *   [ ] motto.translation           ← optional English rendering of the motto
 * ============================================================================
 */

import type { SiteConfig } from "./types";

export const site: SiteConfig = {
  name: "Odutola Christmas 2026",
  shortName: "OC26",
  /**
   * The live address — WhatsApp/Facebook/X need it to find the share image.
   * Set NEXT_PUBLIC_SITE_URL (e.g. https://odutolachristmas.com) in your host's
   * environment variables. On Vercel it is detected automatically if not set.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  description:
    "Three Days. One Family. A Lifetime of Memories. The official Christmas celebration of the family of Chief Dr. Timothy Adeola Odutola — December 24–26, 2026.",
  host: "The Family of Chief Dr. Timothy Adeola Odutola Christmas Planning Committee",
  patriarch: "Chief Dr. Timothy Adeola Odutola",

  /** All times are Lagos time (WAT, UTC+01:00). */
  event: {
    start: "2026-12-24T00:00:00+01:00", // countdown target
    end: "2026-12-26T23:59:59+01:00",
    displayDates: "December 24 — 26, 2026",
    shortDates: "24 · 25 · 26 December",
  },

  hero: {
    tagline: "Three Days. One Family. A Lifetime of Memories.",
    subcopy: "Where generations gather, memories come alive, and family remains everything.",
    invitation: "proudly invites you to celebrate.",
  },

  motto: {
    text: "Àìtàn kì í kọ ilẹ̀ kí lẹ",
    // Leave empty to show the motto on its own. Add an English rendering here
    // if the family would like one displayed beneath it.
    translation: "",
    label: "The Family Motto",
  },

  rsvp: {
    /** ← PASTE THE GOOGLE FORM LINK HERE. Until set, buttons show "link coming soon". */
    googleFormUrl: "",
    deadline: "2026-11-25T23:59:59+01:00",
    displayDeadline: "November 25, 2026",
    /** Set to true to close RSVPs manually before the deadline. Closes automatically after it. */
    forceClosed: false,
    closedMessage: "RSVPs are now closed. We look forward to celebrating with everyone!",
  },

  /** Event information. Empty strings render as "To be announced". */
  info: {
    venue: "",
    city: "",
    dressCode: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  },

  /**
   * MEMORIES — one entry per year, newest first.
   * Photo `src` can be:
   *   • a local path:        "/memories/2025/dinner-01.jpg"   (recommended)
   *   • a Google Drive file: { driveId: "1AbC..." }             (file must be shared "Anyone with the link")
   * Leave `src` and `driveId` empty to show a clearly-labelled placeholder frame.
   * `shape` controls the frame in the editorial grid: "tall" | "wide" | "square".
   */
  memories: [
    {
      year: "2025",
      title: "Placeholder Archive",
      note: "Year label and photographs to be supplied by the committee.",
      photos: [
        { alt: "", shape: "tall" },
        { alt: "", shape: "wide" },
        { alt: "", shape: "square" },
        { alt: "", shape: "square" },
        { alt: "", shape: "wide" },
        { alt: "", shape: "tall" },
        { alt: "", shape: "square" },
      ],
    },
    {
      year: "2024",
      title: "Placeholder Archive",
      note: "Year label and photographs to be supplied by the committee.",
      photos: [
        { alt: "", shape: "wide" },
        { alt: "", shape: "tall" },
        { alt: "", shape: "square" },
        { alt: "", shape: "tall" },
        { alt: "", shape: "square" },
        { alt: "", shape: "wide" },
      ],
    },
    {
      year: "2023",
      title: "Placeholder Archive",
      note: "Year label and photographs to be supplied by the committee.",
      photos: [
        { alt: "", shape: "square" },
        { alt: "", shape: "tall" },
        { alt: "", shape: "wide" },
        { alt: "", shape: "square" },
        { alt: "", shape: "tall" },
      ],
    },
  ],

  /**
   * FILMS — video montages.
   * Use ONE of:
   *   src:      "/videos/montage-2025.mp4"  (self-hosted, best quality)
   *   youtubeId:"dQw4w9WgXcQ"               (unlisted YouTube works well)
   *   driveId:  "1AbC..."                   (Drive preview player; file shared "Anyone with the link")
   * `poster` is an optional still image path.
   */
  films: [
    { title: "Feature Montage", year: "", duration: "", feature: true },
    { title: "Montage II", year: "", duration: "" },
    { title: "Montage III", year: "", duration: "" },
  ],

  /** MENU — categories are set; items stay empty until the menu is confirmed. */
  menu: {
    status: "The menu is being lovingly curated. Final dishes will be revealed soon.",
    categories: [
      { name: "Starters", items: [] },
      { name: "Main Courses", items: [] },
      { name: "Traditional Nigerian Delicacies", items: [] },
      { name: "International Dishes", items: [] },
      { name: "Desserts", items: [] },
      { name: "Drinks & Refreshments", items: [] },
      { name: "Special Christmas Treats", items: [] },
    ],
  },

  /**
   * PROGRAMME — add items like:
   *   { time: "6:00 PM", title: "Carol Night", kind: "Entertainment", note: "" }
   * While `items` is empty, each day shows its placeholder slots.
   */
  programme: [
    {
      day: "01",
      date: "December 24",
      weekday: "Thursday",
      name: "Christmas Eve",
      line: "The gathering begins.",
      items: [],
    },
    {
      day: "02",
      date: "December 25",
      weekday: "Friday",
      name: "Christmas Day",
      line: "The heart of the celebration.",
      items: [],
    },
    {
      day: "03",
      date: "December 26",
      weekday: "Saturday",
      name: "Boxing Day",
      line: "One more day together.",
      items: [],
    },
  ],
  programmeSlots: [
    "Activities",
    "Special Moments",
    "Entertainment",
    "Family Activities",
    "Dining Experiences",
    "Other Celebrations",
  ],

  /** Optional background music. Leave src empty and the music toggle is hidden. Always off by default. */
  music: {
    src: "", // e.g. "/audio/carols.mp3"
    title: "",
  },

  /** Optional social links — only those with a URL are shown. */
  social: [
    // { label: "Instagram", url: "https://instagram.com/..." },
  ],
};
