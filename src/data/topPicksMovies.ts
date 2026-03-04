/**
 * Hollywood movies for Watch (activation) screen. Multiple rows, Netflix-style.
 * All poster images use Picsum (reliable, no CORS/blank issues). Unique seed per title = consistent image.
 */
const PICSUM = (seed: string) => `https://picsum.photos/seed/${seed}/500/750`

export interface TopPickMovie {
  id: string
  title: string
  meta: string
  image: string
  keywords: string[]
}

/** Pool of movies by category. Each image uses a unique seed so thumbnails always load. */
const MOVIES_BY_TASTE: Record<string, TopPickMovie[]> = {
  sportsDocs: [
    { id: 's1', title: 'Racing the Sun', meta: '4K · Sports Documentary', image: PICSUM('racing-sun'), keywords: [] },
    { id: 's2', title: 'Free Solo', meta: 'Documentary · Adventure', image: PICSUM('free-solo'), keywords: [] },
    { id: 's3', title: 'Planet Earth III', meta: '4K · Nature Documentary', image: PICSUM('planet-earth'), keywords: [] },
    { id: 's4', title: 'The Last Dance', meta: 'Sports · Documentary', image: PICSUM('last-dance'), keywords: [] },
    { id: 's5', title: 'Drive to Survive', meta: 'F1 · Docuseries', image: PICSUM('f1-drive'), keywords: [] },
    { id: 's6', title: 'Our Planet II', meta: '4K · Nature', image: PICSUM('our-planet'), keywords: [] },
  ],
  dramaHBO: [
    { id: 'd1', title: 'House of the Dragon', meta: 'HBO · Drama · 4K', image: PICSUM('dragon'), keywords: [] },
    { id: 'd2', title: 'Dune: Part Two', meta: 'Sci‑Fi · 4K', image: PICSUM('dune2'), keywords: [] },
    { id: 'd3', title: 'Oppenheimer', meta: 'Biography · Drama', image: PICSUM('oppenheimer'), keywords: [] },
    { id: 'd4', title: 'The Batman', meta: 'Action · Drama', image: PICSUM('batman'), keywords: [] },
    { id: 'd5', title: 'The Crown', meta: 'Drama · Biography', image: PICSUM('crown'), keywords: [] },
    { id: 'd6', title: 'Succession', meta: 'HBO · Drama', image: PICSUM('succession'), keywords: [] },
  ],
  kidsFamily: [
    { id: 'k1', title: 'Inside Out 2', meta: 'Animation · Family', image: PICSUM('inside-out'), keywords: [] },
    { id: 'k2', title: 'Moana 2', meta: 'Animation · Adventure', image: PICSUM('moana'), keywords: [] },
    { id: 'k3', title: 'Kung Fu Panda 4', meta: 'Animation · Comedy', image: PICSUM('kungfu-panda'), keywords: [] },
    { id: 'k4', title: 'Wonka', meta: 'Family · Musical', image: PICSUM('wonka'), keywords: [] },
    { id: 'k5', title: 'Elemental', meta: 'Animation · Family', image: PICSUM('elemental'), keywords: [] },
    { id: 'k6', title: 'The Super Mario Bros.', meta: 'Animation · Adventure', image: PICSUM('mario'), keywords: [] },
  ],
  blockbusters: [
    { id: 'b1', title: 'Inception', meta: 'Sci‑Fi · Thriller', image: PICSUM('inception'), keywords: [] },
    { id: 'b2', title: 'The Dark Knight', meta: 'Action · Thriller', image: PICSUM('dark-knight'), keywords: [] },
    { id: 'b3', title: 'Interstellar', meta: 'Sci‑Fi · Adventure', image: PICSUM('interstellar'), keywords: [] },
    { id: 'b4', title: 'Top Gun: Maverick', meta: 'Action · Drama', image: PICSUM('topgun'), keywords: [] },
    { id: 'b5', title: 'Avatar: The Way of Water', meta: 'Sci‑Fi · Adventure', image: PICSUM('avatar2'), keywords: [] },
    { id: 'b6', title: 'Spider-Man: No Way Home', meta: 'Action · Sci‑Fi', image: PICSUM('spiderman'), keywords: [] },
    { id: 'b7', title: 'Black Panther: Wakanda Forever', meta: 'Action · Drama', image: PICSUM('black-panther'), keywords: [] },
    { id: 'b8', title: 'Mission: Impossible – Dead Reckoning', meta: 'Action · Thriller', image: PICSUM('mission-impossible'), keywords: [] },
  ],
}

const ALL_MOVIES: TopPickMovie[] = Object.values(MOVIES_BY_TASTE).flat()

function getTasteKey(prompt: string): keyof typeof MOVIES_BY_TASTE {
  const p = prompt.toLowerCase()
  if (/\b(sport|f1|race|live|documentary|nature|planet|doc)\b/.test(p)) return 'sportsDocs'
  if (/\b(hbo|dragon|drama|dune|oppenheimer|batman)\b/.test(p)) return 'dramaHBO'
  if (/\b(kids|family|animation|disney|moana|wonka)\b/.test(p)) return 'kidsFamily'
  return 'blockbusters'
}

/** Single row for the Watch screen */
export interface WatchRow {
  id: string
  title: string
  subtitle?: string
  items: TopPickMovie[]
}

/** Shuffle array and return slice (deterministic for same seed) */
function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    const j = (seed + i) % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/** Build 5 Netflix-style rows based on discovery prompt and plan name */
export function getWatchRows(discoveryPrompt: string, bundleName?: string): WatchRow[] {
  const tasteKey = getTasteKey(discoveryPrompt || 'movies')
  const topPicksList = MOVIES_BY_TASTE[tasteKey] ?? MOVIES_BY_TASTE.blockbusters
  const seed = (discoveryPrompt.length + (bundleName?.length ?? 0)) % 100

  const topPicks = [...topPicksList]
  const youllLove = shuffle([...MOVIES_BY_TASTE.dramaHBO, ...MOVIES_BY_TASTE.blockbusters], seed + 1).slice(0, 8)
  const planMood = bundleName && /family|kids|child/i.test(bundleName)
    ? MOVIES_BY_TASTE.kidsFamily.slice(0, 8)
    : shuffle([...MOVIES_BY_TASTE.blockbusters, ...MOVIES_BY_TASTE.dramaHBO], seed + 2).slice(0, 8)
  const trending = shuffle([...ALL_MOVIES], seed + 3).slice(0, 8)
  const editorsPicks = shuffle([...MOVIES_BY_TASTE.blockbusters, ...MOVIES_BY_TASTE.dramaHBO], seed + 4).slice(0, 8)

  return [
    {
      id: 'top-picks',
      title: 'Top Picks for You',
      subtitle: 'Popular with viewers like you',
      items: topPicks.slice(0, 8),
    },
    {
      id: 'youll-love',
      title: "You'll Love These",
      subtitle: 'Handpicked for your taste',
      items: youllLove,
    },
    {
      id: 'plan-mood',
      title: 'As Per Your Plan Mood',
      subtitle: bundleName ? `Included in ${bundleName}` : 'Curated for your plan',
      items: planMood,
    },
    {
      id: 'trending',
      title: 'Trending Now',
      subtitle: 'What everyone is watching',
      items: trending,
    },
    {
      id: 'editors',
      title: "Editor's Picks",
      subtitle: 'Best of StreamMax',
      items: editorsPicks,
    },
  ]
}

/** Legacy: get 4 movies for Top Picks only (e.g. if used elsewhere) */
export function getTopPicksForPrompt(prompt: string): TopPickMovie[] {
  const key = getTasteKey(prompt || 'movies')
  const list = MOVIES_BY_TASTE[key] ?? ALL_MOVIES
  return list.slice(0, 4)
}
