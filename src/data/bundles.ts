export interface BreakdownItem {
  label: string
  value: string
  isDiscount?: boolean
}

export interface PromoOption {
  id: string
  label: string
  value: string  // e.g. '-$10.00/mo'
  isDiscount: boolean
}

export interface BundleDefinition {
  id: string
  name: string
  pitch: string
  addons: string[]
  discountLabel: string
  discountAmount: string
  priceDisplay: string
  deviceNote?: string
  breakdown: BreakdownItem[]
  /** Alternative promos for price breakdown modal; first one is default. */
  promos?: PromoOption[]
  /** AI explanation for "Why this plan?" */
  aiExplanation?: string
  /** Show low-confidence banner */
  lowConfidence?: boolean
  /** Show price-sensitivity note */
  priceSensitivityDetected?: boolean
}

export const BUNDLES: BundleDefinition[] = [
  {
    id: 'speed-nature',
    name: 'Speed & Nature',
    pitch: "We've built the 'Speed & Nature' bundle for you. It includes 4K streaming for docs and sports, plus a 3‑month HBO trial — saving you $12.",
    addons: ['HBO Max', '4K Ultra HD', 'Sports Plus', 'DVR 500hr'],
    discountLabel: 'Mobile Customer Credit',
    discountAmount: '-$10 Applied',
    priceDisplay: '$54.99/mo',
    deviceNote: "We detected a 4K-ready device and fast connection — we've selected the Ultra HD tier.",
    breakdown: [
      { label: 'Base plan', value: '$49.99/mo' },
      { label: 'HBO Max', value: '$9.99/mo' },
      { label: '4K Ultra HD', value: '$4.99/mo' },
      { label: 'Sports Plus', value: '$7.99/mo' },
      { label: 'DVR 500hr', value: '$12.99/mo' },
      { label: 'Mobile Customer Credit', value: '-$10.00/mo', isDiscount: true },
      { label: 'Total', value: '$54.99/mo' },
    ],
    promos: [
      { id: 'mobile-10', label: 'Mobile Customer Credit', value: '-$10.00/mo', isDiscount: true },
      { id: 'hbo-12', label: 'HBO Trial (3 mo)', value: '-$12.00/mo', isDiscount: true },
      { id: 'none', label: 'No promo', value: '$0', isDiscount: false },
    ],
    aiExplanation: 'Based on your interest in F1 and nature documentaries, plus your device and network speed.',
    lowConfidence: false,
    priceSensitivityDetected: true,
  },
  {
    id: 'family-favorites',
    name: 'Family Favorites',
    pitch: "We've built the 'Family Favorites' bundle for you. It includes kid-safe streaming, 4K Ultra HD, and DVR so you never miss a show — saving you $10 with your mobile plan.",
    addons: ['Kids Safe', '4K Ultra HD', 'DVR 300hr', 'HBO Max'],
    discountLabel: 'Mobile Customer Credit',
    discountAmount: '-$10 Applied',
    priceDisplay: '$49.99/mo',
    deviceNote: "We've selected the best tier for family viewing.",
    breakdown: [
      { label: 'Base plan', value: '$39.99/mo' },
      { label: 'Kids Safe', value: '$4.99/mo' },
      { label: '4K Ultra HD', value: '$4.99/mo' },
      { label: 'DVR 300hr', value: '$9.99/mo' },
      { label: 'HBO Max', value: '$9.99/mo' },
      { label: 'Mobile Customer Credit', value: '-$10.00/mo', isDiscount: true },
      { label: 'Total', value: '$49.99/mo' },
    ],
    promos: [
      { id: 'mobile-10', label: 'Mobile Customer Credit', value: '-$10.00/mo', isDiscount: true },
      { id: 'new-5', label: 'New Subscriber Credit', value: '-$5.00/mo', isDiscount: true },
      { id: 'none', label: 'No promo', value: '$0', isDiscount: false },
    ],
  },
  {
    id: 'sunday-cinema',
    name: 'Sunday Night Cinema',
    pitch: "We've built the 'Sunday Night Cinema' bundle just for you. It includes 4K streaming for your movies and a 3‑month trial of HBO, saving you $12.",
    addons: ['HBO Max', '4K Ultra HD', 'DVR 500hr', 'Starz'],
    discountLabel: 'HBO Trial',
    discountAmount: '-$12 Applied',
    priceDisplay: '$62.99/mo',
    deviceNote: "We've selected the Ultra HD tier for your 4K content.",
    breakdown: [
      { label: 'Base plan', value: '$49.99/mo' },
      { label: 'HBO Max', value: '$9.99/mo' },
      { label: '4K Ultra HD', value: '$4.99/mo' },
      { label: 'DVR 500hr', value: '$12.99/mo' },
      { label: 'Starz', value: '$8.99/mo' },
      { label: 'HBO Trial (3 mo)', value: '-$12.00/mo', isDiscount: true },
      { label: 'Total', value: '$62.99/mo' },
    ],
    promos: [
      { id: 'hbo-12', label: 'HBO Trial (3 mo)', value: '-$12.00/mo', isDiscount: true },
      { id: 'mobile-10', label: 'Mobile Customer Credit', value: '-$10.00/mo', isDiscount: true },
      { id: 'none', label: 'No promo', value: '$0', isDiscount: false },
    ],
  },
  {
    id: 'premium-sports',
    name: 'Premium Sports',
    pitch: "Live sports and premium events in 4K. Includes every major league and PPV — never miss a game.",
    addons: ['Sports Plus', '4K Ultra HD', 'DVR 500hr', 'PPV Events'],
    discountLabel: 'New Subscriber',
    discountAmount: '-$5 Applied',
    priceDisplay: '$69.99/mo',
    deviceNote: "We've selected the Ultra HD tier for the best sports experience.",
    breakdown: [
      { label: 'Base plan', value: '$54.99/mo' },
      { label: 'Sports Plus', value: '$9.99/mo' },
      { label: '4K Ultra HD', value: '$4.99/mo' },
      { label: 'DVR 500hr', value: '$12.99/mo' },
      { label: 'PPV Events', value: '$7.99/mo' },
      { label: 'New Subscriber Credit', value: '-$5.00/mo', isDiscount: true },
      { label: 'Total', value: '$69.99/mo' },
    ],
    promos: [
      { id: 'new-5', label: 'New Subscriber Credit', value: '-$5.00/mo', isDiscount: true },
      { id: 'mobile-10', label: 'Mobile Customer Credit', value: '-$10.00/mo', isDiscount: true },
      { id: 'none', label: 'No promo', value: '$0', isDiscount: false },
    ],
  },
]

export function getBundleById(id: string): BundleDefinition | undefined {
  return BUNDLES.find((b) => b.id === id)
}

/** Parse price string like "$49.99/mo" or "-$10.00/mo" to number (dollars). */
export function parsePriceValue(value: string): number {
  const m = value.replace(/,/g, '').match(/-?\$[\d.]+/)
  if (!m) return 0
  return parseFloat(m[0].replace('$', ''))
}

/** Get breakdown lines without Total and without discount (for recomputing with promo). */
export function getBreakdownWithoutTotalAndDiscount(bundle: BundleDefinition): BreakdownItem[] {
  return bundle.breakdown.filter((i) => i.label !== 'Total' && !i.isDiscount)
}

/** Compute total from line items + selected promo. Returns display string. */
export function computeTotalWithPromo(
  bundle: BundleDefinition,
  selectedPromo: PromoOption | undefined
): string {
  const lines = getBreakdownWithoutTotalAndDiscount(bundle)
  let sum = lines.reduce((a, i) => a + parsePriceValue(i.value), 0)
  if (selectedPromo?.isDiscount) sum += parsePriceValue(selectedPromo.value)
  return `$${sum.toFixed(2)}/mo`
}
