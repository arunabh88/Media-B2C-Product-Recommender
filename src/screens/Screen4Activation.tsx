import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icons } from '../components/Icons'
import { Modal } from '../components/Modal'
import type { BundleDefinition } from '../data/bundles'

interface Screen4ActivationProps {
  selectedBundle: BundleDefinition | null | undefined
  onWatchNow: () => void
}

const RAIL_ITEMS = [
  { id: '1', title: 'Documentary: Racing the Sun', meta: '4K · Sports', image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=400&h=225&fit=crop' },
  { id: '2', title: 'HBO: House of the Dragon', meta: 'Drama · 4K', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=225&fit=crop' },
  { id: '3', title: 'F1: Monaco GP Highlights', meta: 'Live · Sports', image: 'https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=400&h=225&fit=crop' },
  { id: '4', title: 'Nature: Planet Earth III', meta: '4K · Documentary', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=225&fit=crop' },
]

export function Screen4Activation({ selectedBundle, onWatchNow }: Screen4ActivationProps) {
  const bundleName = selectedBundle?.name ?? 'Your'
  const topPicksRef = useRef<HTMLElement>(null)
  const [manageModalOpen, setManageModalOpen] = useState(false)
  const [contentReady, setContentReady] = useState(false)
  const isColdStart = true

  useEffect(() => {
    const t = setTimeout(() => setContentReady(true), 1200)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      key="screen4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Welcome Mat pattern: success state */}
      <div className="slds-welcome-mat slds-welcome-mat_info">
        <div className="slds-welcome-mat__content slds-grid slds-grid_vertical-align-center">
          <div className="slds-welcome-mat__info">
            <div className="slds-welcome-mat__info-body">
              <span className="slds-icon_container slds-icon-utility-success slds-m-bottom_small">
                <span className="slds-icon slds-icon_large slds-icon-text-success">{Icons.success}</span>
              </span>
              <h2 className="slds-text-heading_medium slds-m-bottom_x-small">You&apos;re all set</h2>
              <p className="slds-text-body_regular slds-text-color_weak">
                Your subscription is active.
              </p>
              <div className="slds-m-top_medium slds-grid slds-gutters_small slds-wrap">
                <button
                  type="button"
                  className="slds-button slds-button_brand"
                  onClick={onWatchNow}
                >
                  Watch Now
                </button>
                <button
                  type="button"
                  className="slds-button slds-button_outline-brand"
                  onClick={() => topPicksRef.current?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore My Picks
                </button>
                <button
                  type="button"
                  className="slds-button slds-button_neutral"
                  onClick={() => setManageModalOpen(true)}
                >
                  Manage My Plan
                </button>
              </div>
              <p className="slds-text-body_small slds-text-color_weak slds-m-top_small">
                You&apos;re done in 2–3 clicks — under 30 seconds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Watch Now rail - content related to initial prompt (Cold-start curating) */}
      <section ref={topPicksRef} className="slds-m-top_large" aria-label="Top Picks for You">
        <h3 className="slds-text-heading_small slds-m-bottom_x-small">Top Picks for You</h3>
        {isColdStart && (
          <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_medium">Popular with viewers like you</p>
        )}
        {!contentReady ? (
          <div className="slds-grid slds-gutters_small" style={{ minHeight: 200, alignItems: 'center' }}>
            <div className="slds-spinner slds-spinner_medium" role="status" aria-label="Loading">
              <span className="slds-assistive-text">Loading</span>
              <div className="slds-spinner__dot-a" />
              <div className="slds-spinner__dot-b" />
            </div>
            <p className="slds-text-body_regular slds-text-color_weak slds-m-left_small">Getting your recommendations ready…</p>
          </div>
        ) : (
        <div className="rail-grid">
          {RAIL_ITEMS.map((item, i) => (
            <motion.article
              key={item.id}
              className="slds-card rail-tile"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              style={{ cursor: 'pointer' }}
              whileHover={{ scale: 1.05 }}
              onClick={onWatchNow}
            >
              <div className="slds-card__body slds-card__body_inner">
                <div className="rail-tile__thumb" style={{ backgroundImage: `url(${item.image})` }} />
                <h4 className="slds-text-body_small slds-m-top_x-small slds-truncate" title={item.title}>
                  {item.title}
                </h4>
                <p className="slds-text-body_small slds-text-color_weak">{item.meta}</p>
              </div>
            </motion.article>
          ))}
        </div>
        )}
      </section>

      <Modal
        open={manageModalOpen}
        onClose={() => setManageModalOpen(false)}
        title="Manage My Plan"
        footer={
          <button
            type="button"
            className="slds-button slds-button_brand"
            onClick={() => setManageModalOpen(false)}
          >
            Close
          </button>
        }
      >
        <div className="slds-p-around_medium">
          <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_small">Account overview (read-only)</p>
          <dl className="slds-dl_horizontal slds-dl_inline">
            <div className="slds-item slds-m-bottom_small">
              <dt className="slds-dl_horizontal__label slds-text-body_small">Plan</dt>
              <dd className="slds-dl_horizontal__detail slds-text-body_small">{bundleName}</dd>
            </div>
            <div className="slds-item slds-m-bottom_small">
              <dt className="slds-dl_horizontal__label slds-text-body_small">Status</dt>
              <dd className="slds-dl_horizontal__detail slds-text-body_small">Active</dd>
            </div>
            <div className="slds-item">
              <dt className="slds-dl_horizontal__label slds-text-body_small">Next billing</dt>
              <dd className="slds-dl_horizontal__detail slds-text-body_small">{selectedBundle?.priceDisplay ?? '—'}</dd>
            </div>
          </dl>
        </div>
      </Modal>
    </motion.div>
  )
}
