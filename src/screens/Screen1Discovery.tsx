import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icons } from '../components/Icons'

const INSPIRATION_CHIPS = [
  'Live F1 & Documentaries',
  'HBO Hits & 4K Movies',
  'Kids Shows & Family Favorites',
]

interface Screen1Props {
  onNext: (prompt: string) => void
}

export function Screen1Discovery({ onNext }: Screen1Props) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = prompt.trim() || INSPIRATION_CHIPS[0]
    onNext(value)
  }

  const handleChipClick = (label: string) => {
    setPrompt(label)
    onNext(label)
  }

  return (
    <motion.div
      key="screen1"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="slds-grid slds-grid_vertical slds-grid_vertical-align-center"
      style={{ minHeight: '70vh', padding: '2rem 0' }}
    >
      <div className="slds-text-align_center slds-m-bottom_large">
        <h1 className="slds-text-heading_large slds-m-bottom_small" style={{ fontWeight: 300 }}>
          What do you love to watch?
        </h1>
        <p className="slds-text-body_regular slds-text-color_weak">
          We’ll recommend the perfect bundle for you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="slds-form" style={{ width: '100%', maxWidth: 560, margin: '0 auto' }}>
        <div className="slds-form-element slds-m-bottom_medium">
          <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon_left-right">
            <span className="slds-icon_container slds-icon-utility-search slds-input__icon slds-input__icon_left">
              {Icons.search}
            </span>
            <input
              id="discovery-prompt"
              type="search"
              className="slds-input"
              placeholder="Tell me what you love to watch..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              aria-label="Describe what you love to watch"
              autoFocus
            />
            {prompt && (
              <button
                type="button"
                className="slds-input__icon slds-input__icon_right slds-button slds-button_icon"
                onClick={() => setPrompt('')}
                aria-label="Clear"
              >
                {Icons.close}
              </button>
            )}
          </div>
        </div>

        <div className="slds-m-bottom_medium">
          <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_small">Or try one of these:</p>
          <div className="slds-grid slds-wrap slds-gutters_small slds-grid_vertical-align-center">
            {INSPIRATION_CHIPS.map((label) => (
              <motion.button
                key={label}
                type="button"
                className="slds-button slds-button_neutral slds-p-around_small"
                style={{ borderRadius: 9999, margin: 4 }}
                onClick={() => handleChipClick(label)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="slds-text-align_center">
          <button type="submit" className="slds-button slds-button_brand slds-button_stretch">
            Find my bundle
          </button>
        </div>
      </form>
    </motion.div>
  )
}
