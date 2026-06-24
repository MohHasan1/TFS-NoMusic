const LIBRARY_COVER_IMAGE = "/test_lib.jpg";

type TLibrarySectionKey = "exploreByLanguage" | "noMusicAlbums" | "userLibraries";

export type TLibraryTrack = {
  title: string;
  artist: string;
  duration: string;
  image: string;
};

export type TLibraryDetail = {
  id: string;
  section: TLibrarySectionKey;
  name: string;
  description: string;
  trackCount: number;
  coverImage: string;
  tracks: readonly TLibraryTrack[];
};

const createTrack = (title: string, artist: string, duration: string): TLibraryTrack => ({
  title,
  artist,
  duration,
  image: LIBRARY_COVER_IMAGE,
});

export const LIBRARY_DETAILS: readonly TLibraryDetail[] = [
  {
    id: "arabic-collection",
    section: "exploreByLanguage",
    name: "Arabic Collection",
    description: "A focused set of Arabic vocal cuts curated for smooth browsing and quick discovery.",
    trackCount: 12,
    coverImage: LIBRARY_COVER_IMAGE,
    tracks: [
      createTrack("Sahar Echo", "Nour Haleem", "3:42"),
      createTrack("Layali Glow", "Amal Vibe", "4:11"),
      createTrack("Desert Room", "Yara Pulse", "3:28"),
      createTrack("Cairo Nights", "Samir Tone", "5:06"),
      createTrack("Velvet Minaret", "Lina Noor", "4:19"),
    ],
  },
  {
    id: "english-collection",
    section: "exploreByLanguage",
    name: "English Collection",
    description: "Clean English vocals grouped for everyday listening, practice sessions, and fast access.",
    trackCount: 8,
    coverImage: LIBRARY_COVER_IMAGE,
    tracks: [
      createTrack("After Hours Echoes", "Vapor Drift", "3:45"),
      createTrack("Midnight City Pulse", "Cyber Unit", "4:21"),
      createTrack("Velvet Synth", "Luna Ray", "2:58"),
      createTrack("Starlight Drive", "The Void", "5:12"),
      createTrack("Neon Rain", "Quartz", "3:15"),
    ],
  },
  {
    id: "urdu-collection",
    section: "exploreByLanguage",
    name: "Urdu Collection",
    description: "A softer Urdu-led shelf for melodic vocals, moodier tones, and late-night replay value.",
    trackCount: 6,
    coverImage: LIBRARY_COVER_IMAGE,
    tracks: [
      createTrack("Raat Ki Lehar", "Areeb Noor", "4:02"),
      createTrack("Dil Se Door", "Sana Riaz", "3:36"),
      createTrack("Barish Voice", "Umair Khan", "4:27"),
      createTrack("Sheher Waqt", "Misha Ali", "3:18"),
      createTrack("Khamosh Run", "Faris Jade", "5:01"),
    ],
  },
  {
    id: "late-night-vocals",
    section: "noMusicAlbums",
    name: "Late Night Vocals",
    description: "An editorial-style album collection built around darker textures and after-hours pacing.",
    trackCount: 14,
    coverImage: LIBRARY_COVER_IMAGE,
    tracks: [
      createTrack("Moonlit Draft", "Nova Choir", "3:49"),
      createTrack("Static Bloom", "Aftertone", "4:18"),
      createTrack("Night Corridor", "Sable Form", "3:13"),
      createTrack("Quiet Voltage", "Polar Youth", "4:32"),
      createTrack("Sleepless Line", "Echo State", "5:08"),
    ],
  },
  {
    id: "warmup-session",
    section: "noMusicAlbums",
    name: "Warmup Session",
    description: "A brighter curated set designed for quick starts, rehearsals, and lighter vocal energy.",
    trackCount: 9,
    coverImage: LIBRARY_COVER_IMAGE,
    tracks: [
      createTrack("First Pass", "June Static", "3:06"),
      createTrack("Soft Launch", "Mira Bloom", "3:54"),
      createTrack("Golden Count-In", "Rae Motion", "4:09"),
      createTrack("Open Room", "Atlas Hue", "2:57"),
      createTrack("Daylight Fade", "Velour Set", "3:41"),
    ],
  },
  {
    id: "studio-cuts",
    section: "noMusicAlbums",
    name: "Studio Cuts",
    description: "A tighter album lane for polished takes, clean edits, and session-ready vocal moments.",
    trackCount: 11,
    coverImage: LIBRARY_COVER_IMAGE,
    tracks: [
      createTrack("Mic Check Blue", "Signal Park", "3:17"),
      createTrack("Take Eleven", "Aria North", "4:10"),
      createTrack("Glass Booth", "Frame Voice", "3:39"),
      createTrack("Control Room", "Mono Vale", "4:33"),
      createTrack("Final Print", "Rift Echo", "3:58"),
    ],
  },
  {
    id: "mohammeds-picks",
    section: "userLibraries",
    name: "Mohammed's Picks",
    description: "A personal selection shaped around repeat listens, saved favorites, and dependable standouts.",
    trackCount: 7,
    coverImage: LIBRARY_COVER_IMAGE,
    tracks: [
      createTrack("Night Index", "Vera Sun", "3:38"),
      createTrack("Signal Glow", "House of Air", "4:12"),
      createTrack("Parallel Voice", "Nico Vale", "3:05"),
      createTrack("Rooftop Memory", "Quiet Harbour", "4:40"),
      createTrack("Slow Return", "Luma Crest", "3:29"),
    ],
  },
  {
    id: "choir-references",
    section: "userLibraries",
    name: "Choir References",
    description: "Reference-driven selections collected for arrangement ideas, blends, and vocal texture notes.",
    trackCount: 5,
    coverImage: LIBRARY_COVER_IMAGE,
    tracks: [
      createTrack("Wide Harmony", "North Choir", "4:22"),
      createTrack("Fourth Layer", "Vox Assembly", "3:47"),
      createTrack("Cathedral Wire", "Halo Set", "5:04"),
      createTrack("Breath Stack", "Minor Bloom", "2:51"),
      createTrack("Final Chorus", "Glass Voices", "4:09"),
    ],
  },
  {
    id: "mix-notes",
    section: "userLibraries",
    name: "Mix Notes",
    description: "A workbench-style library for quick references, balance checks, and saved mix ideas.",
    trackCount: 10,
    coverImage: LIBRARY_COVER_IMAGE,
    tracks: [
      createTrack("Low End Memo", "Trace Room", "3:33"),
      createTrack("Center Push", "Amber Dial", "4:05"),
      createTrack("Air Lift", "Mode Six", "2:49"),
      createTrack("Dry Signal", "Sora Field", "3:58"),
      createTrack("Room Tail", "Quiet Draft", "4:26"),
    ],
  },
] as const;

export function getLibraryDetail(id: string) {
  return LIBRARY_DETAILS.find((library) => library.id === id);
}
