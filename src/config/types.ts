export type PhotoShape = "tall" | "wide" | "square";

export interface Photo {
  src?: string;
  driveId?: string;
  alt: string;
  caption?: string;
  shape: PhotoShape;
}

export interface MemoryYear {
  year: string;
  title: string;
  note?: string;
  photos: Photo[];
}

export interface Film {
  title: string;
  year?: string;
  duration?: string;
  src?: string;
  youtubeId?: string;
  driveId?: string;
  poster?: string;
  feature?: boolean;
}

export interface MenuItem {
  name: string;
  description?: string;
  tag?: string;
}

export interface ProgrammeItem {
  time?: string;
  title: string;
  kind?: string;
  note?: string;
}

export interface ProgrammeDay {
  day: string;
  date: string;
  weekday: string;
  name: string;
  line: string;
  items: ProgrammeItem[];
}

export interface SiteConfig {
  name: string;
  shortName: string;
  url: string;
  description: string;
  host: string;
  patriarch: string;
  event: { start: string; end: string; displayDates: string; shortDates: string };
  hero: { tagline: string; subcopy: string; invitation: string };
  motto: { text: string; translation: string; label: string };
  rsvp: {
    googleFormUrl: string;
    deadline: string;
    displayDeadline: string;
    forceClosed: boolean;
    closedMessage: string;
  };
  info: {
    venue: string;
    city: string;
    dressCode: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
  };
  memories: MemoryYear[];
  films: Film[];
  menu: { status: string; categories: { name: string; items: MenuItem[] }[] };
  programme: ProgrammeDay[];
  programmeSlots: string[];
  music: { src: string; title: string };
  social: { label: string; url: string }[];
}
