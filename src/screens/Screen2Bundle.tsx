import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Icons } from '../components/Icons'

interface Screen2BundleProps {
  prompt: string
  onNext: () => void
  onPriceBreakdown: () => void
}

const ADDONS = ['HBO Max', '4K Ultra HD', 'Sports Plus', 'DVR 500hr']
const DISCOUNT_LABEL = 'Mobile Customer Credit'
const DISCOUNT_AMOUNT = '-$10 Applied'

/** Derive bundle name from prompt for generative feel (e.g. "Speed & Nature" for F1/docs). */
function getBundleNameAndPitch(prompt: string): { name: string; pitch: string } {
  const lower = prompt.toLowerCase()
  if (lower.includes('f1') || lower.includes('race') || lower.includes('sport') || lower.includes('doc') || lower.includes('nature')) {
    return {
      name: 'Speed & Nature',
      pitch: "We've built the 'Speed & Nature' bundle for you. It includes 4K streaming for docs and sports, plus a 3‑month HBO trial — saving you $12.",
    }
  }
  if (lower.includes('kids') || lower.includes('family')) {
    return {
      name: 'Family Favorites',
      pitch: "We've built the 'Family Favorites' bundle for you. It includes kid-safe streaming, 4K Ultra HD, and DVR so you never miss a show — saving you $10 with your mobile plan.",
    }
  }
  return {
    name: 'Sunday Night Cinema',
    pitch: "We've built the 'Sunday Night Cinema' bundle just for you. It includes 4K streaming for your movies and a 3‑month trial of HBO, saving you $12.",
  }
}

export function Screen2Bundle({ prompt, onNext, onPriceBreakdown }: Screen2BundleProps) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800)
    return () => clearTimeout(t)
  }, [])

  if (loading) {
    return (
      <motion.div
        key="screen2-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="slds-grid slds-grid_vertical-align-center slds-grid_vertical-align-center"
        style={{ minHeight: '60vh', flexDirection: 'column' }}
      >
        <div className="slds-spinner slds-spinner_medium" role="status" aria-label="Loading">
          <span className="slds-assistive-text">Loading</span>
          <div className="slds-spinner__dot-a" />
          <div className="slds-spinner__dot-b" />
        </div>
        <p className="slds-m-top_medium slds-text-body_regular slds-text-color_weak">
          Finding the best bundle for you…
        </p>
      </motion.div>
    )
  }

  return (
    <motion.div
      key="screen2-bundle"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: 480, margin: '0 auto' }}
    >
      <h2 className="slds-text-heading_medium slds-m-bottom_medium">Recommended for You</h2>

      <article className="slds-card slds-m-bottom_medium">
        <div className="slds-card__header slds-grid">
          <header className="slds-media slds-media_center slds-has-flexi-truncate">
            <div className="slds-media__figure">
              <span className="slds-icon_container slds-icon_container_circle slds-icon-standard-opportunity">
                {Icons.opportunity}
              </span>
            </div>
            <div className="slds-media__body">
              <h3 className="slds-card__header-title slds-truncate slds-text-heading_small">
                {getBundleNameAndPitch(prompt).name}
              </h3>
              <p className="slds-text-body_small slds-text-color_weak">Based on: “{prompt}”</p>
            </div>
          </header>
        </div>
        <div className="slds-card__body slds-card__body_inner">
          <p className="slds-text-body_regular slds-m-bottom_small">
            {getBundleNameAndPitch(prompt).pitch}
          </p>
          <p className="slds-text-body_small slds-m-bottom_small">Included add-ons:</p>
          <div className="slds-m-bottom_medium">
            {ADDONS.map((addon) => (
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
              <strong>{DISCOUNT_LABEL}</strong> {DISCOUNT_AMOUNT}
            </span>
          </div>
          <div className="slds-box slds-box_x-small slds-m-bottom_medium" style={{ background: 'var(--slds-g-neutral-95, #f3f3f3)' }}>
            <span className="slds-text-body_small slds-text-color_weak">
              We detected a 4K-ready device and fast connection — we’ve selected the Ultra HD tier.
            </span>
          </div>
          <button
            type="button"
            className="slds-button slds-button_stretch slds-button_link slds-text-body_small"
            onClick={onPriceBreakdown}
          >
            View price breakdown
          </button>
        </div>
        <div className="slds-card__footer">
          <button
            type="button"
            className="slds-button slds-button_brand slds-button_stretch"
            onClick={onNext}
          >
            Get Started
          </button>
        </div>
      </article>
    </motion.div>
  )
}
