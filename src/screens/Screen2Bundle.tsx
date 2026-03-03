import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Icons } from '../components/Icons'
import { BUNDLES, getBundleById, type BundleDefinition } from '../data/bundles'

/** Simple keyword relevance score: count matches of prompt words in bundle name, pitch, addons. */
function scoreRelevance(bundle: BundleDefinition, prompt: string): number {
  if (!prompt.trim()) return 0
  const words = prompt
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 1)
  const text = [bundle.name, bundle.pitch, ...bundle.addons].join(' ').toLowerCase()
  return words.reduce((score, word) => (text.includes(word) ? score + 1 : score), 0)
}

/** Order bundles by relevance (desc), then keep original order for ties. */
function orderByRelevance(bundles: BundleDefinition[], prompt: string): BundleDefinition[] {
  const withScores = bundles.map((b) => ({ bundle: b, score: scoreRelevance(b, prompt) }))
  withScores.sort((a, b) => b.score - a.score)
  return withScores.map((x) => x.bundle)
}

interface Screen2BundleProps {
  prompt: string
  initialBestFitBundleId?: string | null
  onNext: (bundleId: string) => void
  onPriceBreakdown: (bundleId: string) => void
  onBack?: () => void
}

export function Screen2Bundle({ prompt, initialBestFitBundleId, onNext, onPriceBreakdown, onBack }: Screen2BundleProps) {
  const [loading, setLoading] = useState(true)
  const [showAlternates, setShowAlternates] = useState(false)
  const [whyOpen, setWhyOpen] = useState(false)
  const orderedBundles = useMemo(() => {
    const byRelevance = orderByRelevance(BUNDLES, prompt)
    if (initialBestFitBundleId) {
      const best = byRelevance.find((b) => b.id === initialBestFitBundleId) ?? getBundleById(initialBestFitBundleId)
      if (best) {
        const rest = byRelevance.filter((b) => b.id !== best.id)
        return [best, ...rest]
      }
    }
    return byRelevance
  }, [prompt, initialBestFitBundleId])

  useEffect(() => {
    const delay = initialBestFitBundleId ? 500 : 1800
    const t = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(t)
  }, [initialBestFitBundleId])

  if (loading) {
    return (
      <motion.div
        key="screen2-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="slds-grid slds-grid_vertical-align-center"
        style={{ minHeight: '60vh', flexDirection: 'column' }}
      >
        <div className="slds-spinner slds-spinner_medium" role="status" aria-label="Loading">
          <span className="slds-assistive-text">Loading</span>
          <div className="slds-spinner__dot-a" />
          <div className="slds-spinner__dot-b" />
        </div>
        <p className="slds-m-top_medium slds-text-body_regular slds-text-color_weak">
          Finding plans you&apos;ll love…
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      key="screen2-bundle"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}
    >
      {onBack && (
        <div className="slds-m-bottom_medium">
          <button
            type="button"
            className="back-link slds-button slds-button_link slds-p-left_none"
            onClick={onBack}
            style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center', gap: 6 }}
          >
            <span className="slds-icon_container" style={{ lineHeight: 1 }}>{Icons.chevronLeft}</span>
            Back to search
          </button>
        </div>
      )}

      <h2 className="slds-text-heading_medium slds-m-bottom_small">Best-Fit Plan</h2>
      <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_medium">Based on: &ldquo;{prompt}&rdquo;</p>

      <div id="bundle-cards" className="bundle-grid" style={{ gridTemplateColumns: '1fr' }}>
        {orderedBundles[0] && (() => {
          const bestFit = orderedBundles[0]
          const lowConfidence = bestFit.lowConfidence ?? (scoreRelevance(bestFit, prompt) === 0 && !initialBestFitBundleId)
          return (
            <>
              {lowConfidence && onBack && (
                <div className="slds-box slds-box_x-small slds-m-bottom_small" style={{ background: 'var(--slds-g-neutral-95, #f3f3f3)' }}>
                  <p className="slds-text-body_small">Not sure we nailed it? <button type="button" className="slds-button slds-button_link slds-button_inline" onClick={onBack}>Tweak this in one tap</button>.</p>
                </div>
              )}
              {bestFit.priceSensitivityDetected && (
                <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_small">We picked the most value-optimized option for you.</p>
              )}
              <BestFitCard bundle={bestFit} whyOpen={whyOpen} onWhyToggle={() => setWhyOpen((v) => !v)} onContinue={() => onNext(bestFit.id)} onPriceBreakdown={() => onPriceBreakdown(bestFit.id)} />
              <div className="slds-m-top_small">
                <button type="button" className="slds-button slds-button_neutral" onClick={() => setShowAlternates((v) => !v)}>{showAlternates ? 'Hide other options' : 'See Other Options'}</button>
                {onBack && <button type="button" className="slds-button slds-button_link slds-m-left_small" onClick={onBack}>Change Preferences</button>}
              </div>
              {showAlternates && orderedBundles.length > 1 && (
                <div className="slds-m-top_large" style={{ gridColumn: '1' }}>
                  <h3 className="slds-text-heading_small slds-m-bottom_small">Other plans</h3>
                  <div className="bundle-grid">
                    {orderedBundles.slice(1, 4).map((b) => (
                      <BundleCard key={b.id} bundle={b} onGetStarted={() => onNext(b.id)} onPriceBreakdown={() => onPriceBreakdown(b.id)} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )
        })()}
      </div>
    </motion.div>
  )
}

function BestFitCard({ bundle, whyOpen, onWhyToggle, onContinue, onPriceBreakdown }: { bundle: BundleDefinition; whyOpen: boolean; onWhyToggle: () => void; onContinue: () => void; onPriceBreakdown: () => void }) {
  const explanation = bundle.aiExplanation ?? bundle.deviceNote ?? 'Based on your preferences and device.'
  return (
    <article className="slds-card bundle-card">
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__figure">
            <span className="slds-icon_container slds-icon_container_circle slds-icon-standard-opportunity">{Icons.opportunity}</span>
          </div>
          <div className="slds-media__body">
            <h3 className="slds-card__header-title slds-truncate slds-text-heading_small">{bundle.name}</h3>
            <span className="slds-badge slds-badge_lightest bundle-promo-badge">Best Fit</span>
          </div>
        </header>
      </div>
      <div className="slds-card__body slds-card__body_inner">
        <p className="slds-text-body_regular slds-m-bottom_small">{bundle.pitch}</p>
        <p className="slds-text-body_small slds-m-bottom_x-small">Included add-ons:</p>
        <div className="slds-m-bottom_small">
          {bundle.addons.map((addon) => (
            <span key={addon} className="slds-badge slds-m-right_x-small slds-m-bottom_x-small" style={{ fontSize: '0.75rem' }}>{addon}</span>
          ))}
        </div>
        <div className="slds-box slds-box_x-small slds-theme_success slds-m-bottom_small">
          <span className="slds-text-body_small"><strong>{bundle.discountLabel}</strong> {bundle.discountAmount}</span>
        </div>
        {bundle.deviceNote && (
          <div className="slds-box slds-box_x-small slds-m-bottom_small" style={{ background: 'var(--slds-g-neutral-95, #f3f3f3)' }}>
            <span className="slds-text-body_small slds-text-color_weak">{bundle.deviceNote}</span>
          </div>
        )}
        <div className="slds-m-top_small">
          <button type="button" className="slds-button slds-button_stretch slds-button_link slds-text-body_small" onClick={onWhyToggle} aria-expanded={whyOpen}>Why this plan? {whyOpen ? '−' : '+'}</button>
          {whyOpen && <p className="slds-text-body_small slds-text-color_weak slds-m-top_x-small slds-p-left_small">{explanation}</p>}
        </div>
        <button type="button" className="slds-button slds-button_stretch slds-button_link slds-text-body_small" onClick={onPriceBreakdown}>View price breakdown</button>
      </div>
      <div className="slds-card__footer">
        <p className="slds-text-body_small slds-m-bottom_x-small slds-text-color_weak">Total</p>
        <p className="slds-text-heading_medium slds-m-bottom_small">{bundle.priceDisplay}</p>
        <button type="button" className="slds-button slds-button_brand slds-button_stretch" onClick={onContinue}>Continue</button>
      </div>
    </article>
  )
}

function BundleCard({
  bundle,
  onGetStarted,
  onPriceBreakdown,
}: {
  bundle: BundleDefinition
  onGetStarted: () => void
  onPriceBreakdown: () => void
}) {
  const hasPromo = bundle.breakdown.some((i) => i.isDiscount)

  return (
    <article className="slds-card bundle-card">
      <div className="slds-card__header slds-grid">
        <header className="slds-media slds-media_center slds-has-flexi-truncate">
          <div className="slds-media__figure">
            <span className="slds-icon_container slds-icon_container_circle slds-icon-standard-opportunity">
              {Icons.opportunity}
            </span>
          </div>
          <div className="slds-media__body">
            <h3 className="slds-card__header-title slds-truncate slds-text-heading_small">{bundle.name}</h3>
            {hasPromo && (
              <span className="slds-badge slds-badge_lightest slds-theme_success bundle-promo-badge">Promo Applied</span>
            )}
          </div>
        </header>
      </div>
      <div className="slds-card__body slds-card__body_inner">
        <p className="slds-text-body_regular slds-m-bottom_small">{bundle.pitch}</p>
        <p className="slds-text-body_small slds-m-bottom_x-small">Included add-ons:</p>
        <div className="slds-m-bottom_small">
          {bundle.addons.map((addon) => (
            <span
              key={addon}
              className="slds-badge slds-m-right_x-small slds-m-bottom_x-small"
              style={{ fontSize: '0.75rem' }}
            >
              {addon}
            </span>
          ))}
        </div>
        <div className="slds-box slds-box_x-small slds-theme_success slds-m-bottom_small">
          <span className="slds-text-body_small">
            <strong>{bundle.discountLabel}</strong> {bundle.discountAmount}
          </span>
        </div>
        {bundle.deviceNote && (
          <div className="slds-box slds-box_x-small slds-m-bottom_small" style={{ background: 'var(--slds-g-neutral-95, #f3f3f3)' }}>
            <span className="slds-text-body_small slds-text-color_weak">{bundle.deviceNote}</span>
          </div>
        )}
      </div>
      <div className="slds-card__footer">
        <p className="slds-text-body_small slds-m-bottom_x-small slds-text-color_weak">Total</p>
        <p className="slds-text-heading_medium slds-m-bottom_small">{bundle.priceDisplay}</p>
        <button
          type="button"
          className="slds-button slds-button_stretch slds-button_link slds-text-body_small"
          onClick={onPriceBreakdown}
        >
          View price breakdown
        </button>
        <button
          type="button"
          className="slds-button slds-button_brand slds-button_stretch"
          onClick={onGetStarted}
        >
          Get Started
        </button>
      </div>
    </article>
  )
}
