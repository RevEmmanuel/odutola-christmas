# Odutola Christmas 2026

The official website for the Christmas celebration of the family of Chief Dr. Timothy Adeola Odutola, December 24–26, 2026.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons. Fonts are self-hosted with Fontsource (Fraunces, Cormorant Garamond and Manrope), and all three cover Yoruba diacritics.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (Vercel / Node hosting, with image optimisation)
npm run export     # static site in /out — upload to any static host (Netlify, Cloudflare Pages, cPanel…)
```

## Updating content: one file

Everything is in **`src/config/site.ts`**. No component hardcodes event content.

| What | Where in `site.ts` |
|---|---|
| Google Form RSVP link | `rsvp.googleFormUrl` |
| Close RSVPs early | `rsvp.forceClosed = true` (it also closes on its own after the deadline) |
| Closed message | `rsvp.closedMessage` |
| Venue, dress code, contact | `info.*` (empty values show "To be announced") |
| Photos | `memories[]` |
| Video montages | `films[]` |
| Menu | `menu.categories[].items` |
| Programme | `programme[].items` |
| Motto translation | `motto.translation` (optional) |
| Background music | `music.src` (the toggle only appears once a file is set, and music is always off by default) |
| Social links | `social[]` |
| Live domain for SEO | `url` |

### RSVP behaviour
- Every "Confirm your attendance" button opens the Google Form in a new tab. The site never collects or stores personal information.
- Until `googleFormUrl` is set, the buttons show a disabled "link coming soon" state, so no link is ever broken.
- After **25 Nov 2026, 23:59 WAT**, every RSVP button, the floating pill and the RSVP countdown switch to the closed message automatically.

## Photos: why not embed Google Drive directly?

You can't reliably embed a Google Drive *folder* in a website. There's no supported gallery embed, Drive's own folder embed is an unstyled file list, and Drive throttles image hotlinking under load. Your photos would load slowly or fail to load at the moment family members are looking.

**Recommended (fast and reliable):**
1. Download the photos from Drive, in folders by year.
2. Resize them to about 2000px on the long edge (JPG or WebP, ideally under 500 KB each).
3. Put them in `public/memories/<year>/`, e.g. `public/memories/2025/carols-01.jpg`.
4. List them in `site.ts`:

```ts
{ src: "/memories/2025/carols-01.jpg", alt: "Cousins singing carols", caption: "Carol night", shape: "wide" }
```

`shape` controls the editorial grid: `"tall"`, `"wide"` or `"square"`. Mix them for the best rhythm.

**Quick alternative:** share each Drive *file* as "Anyone with the link" and use its file ID:

```ts
{ driveId: "1AbCdEfGh...", alt: "...", shape: "square" }
```

The file ID is the long code in `drive.google.com/file/d/<ID>/view`. This works, but it's slower and less reliable than local files.

To add a new year, add another object to `memories` with `year`, `title`, `note` and `photos`. Any frame without a `src` or `driveId` shows as a clearly labelled placeholder.

## Videos

Each film in `films[]` takes **one** source:
- `src: "/videos/montage.mp4"`: self-hosted in `public/videos/` (best quality; keep files under about 100 MB, H.264 MP4)
- `youtubeId: "xxxx"`: an **unlisted** YouTube video. This is the best option for large montages.
- `driveId: "xxxx"`: Google Drive's preview player (the file must be shared "Anyone with the link")

Add `poster: "/videos/montage-poster.jpg"` for a still frame. Set `feature: true` on the main montage.

## Menu and programme

```ts
menu.categories[0].items = [{ name: "Dish name", description: "Short description", tag: "Chef's choice" }];
programme[1].items = [{ time: "2:00 PM", title: "Christmas Lunch", kind: "Dining", note: "" }];
```

While a list is empty, the site shows elegant "To be revealed" or "TBA" placeholders.

## Brand assets
- `public/brand/crest.webp`: the family crest, cut out of its black background (for dark sections)
- `public/brand/crest-400.webp`: a small version for the nav, loader and footer
- `public/brand/og.jpg`: the social-share image
- `src/app/icon.png`: the favicon

For the sharpest crest, replace these with an export from the original vector or artwork file. The current versions are taken from a photograph.

## Structure

```
src/
  config/site.ts      ← all content
  config/types.ts
  lib/                ← countdown + RSVP/date helpers
  components/         ← one component per section
  app/                ← layout (SEO, fonts), page, globals.css (design tokens)
public/
  brand/  memories/  videos/  audio/
```

Accessibility: semantic landmarks, a skip link, focus styles, keyboard support in the lightbox and menu, `lang="yo"` on the motto, and `prefers-reduced-motion` respected throughout (the loader and particles are disabled, and animations are reduced).
