import { useState, useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Icons } from '../components/Icons'
import { Modal } from '../components/Modal'
import { getWatchRows } from '../data/topPicksMovies'
import type { BundleDefinition } from '../data/bundles'

interface Screen4ActivationProps {
  selectedBundle: BundleDefinition | null | undefined
  /** User's input from step 1 (discovery) – used to pick movie taste */
  discoveryPrompt?: string
  onWatchNow: () => void
  registerScrollToPicks?: (fn: () => void) => void
  registerOpenManageModal?: (fn: () => void) => void
}

export function Screen4Activation({ selectedBundle, discoveryPrompt = '', onWatchNow, registerScrollToPicks, registerOpenManageModal }: Screen4ActivationProps) {
  const bundleName = selectedBundle?.name ?? 'Your'
  const topPicksRef = useRef<HTMLElement>(null)
  const [manageModalOpen, setManageModalOpen] = useState(false)
  const [contentReady, setContentReady] = useState(false)

  const railItems = useMemo(
    () => getWatchRows(discoveryPrompt, selectedBundle?.name),
    [discoveryPrompt, selectedBundle?.name]
  )

  useEffect(() => {
    const t = setTimeout(() => setContentReady(true), 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    registerScrollToPicks?.(() => topPicksRef.current?.scrollIntoView({ behavior: 'smooth' }))
    return () => {
      registerScrollToPicks?.(() => {})
    }
  }, [registerScrollToPicks])

  useEffect(() => {
    registerOpenManageModal?.(() => setManageModalOpen(true))
    return () => {
      registerOpenManageModal?.(() => {})
    }
  }, [registerOpenManageModal])

  return (
    <motion.div
      key="screen4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Welcome Mat: success state */}
      <div className="welcome-mat">
        <div className="welcome-mat__content">
          <div className="welcome-mat__icon-wrap" aria-hidden="true">
            <span className="welcome-mat__icon">{Icons.success}</span>
          </div>
          <h2 className="welcome-mat__title">You&apos;re all set</h2>
          <p className="welcome-mat__subtitle">
            Your subscription is active. Start watching in seconds.
          </p>
        </div>
      </div>

      {/* Watch: Netflix-style rows */}
      <div className="watch-rows" ref={topPicksRef}>
        {!contentReady ? (
          <div className="watch-rows__loading">
            <div className="slds-spinner slds-spinner_medium" role="status" aria-label="Loading">
              <span className="slds-assistive-text">Loading</span>
              <div className="slds-spinner__dot-a" />
              <div className="slds-spinner__dot-b" />
            </div>
            <p className="slds-text-body_regular slds-text-color_weak">Getting your recommendations ready…</p>
          </div>
        ) : (
          railItems.map((row, rowIndex) => (
            <section
              key={row.id}
              className="watch-row"
              aria-label={row.title}
              style={{ animationDelay: `${rowIndex * 0.05}s` }}
            >
              <h3 className="watch-row__title">{row.title}</h3>
              {row.subtitle && <p className="watch-row__subtitle">{row.subtitle}</p>}
              <div className="watch-row__scroll-wrap">
                <div className="watch-row__scroll">
                  {row.items.map((item, i) => (
                    <motion.article
                      key={`${row.id}-${item.id}`}
                      className="rail-tile"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.02 * i + rowIndex * 0.03, duration: 0.25 }}
                      style={{ cursor: 'pointer', flexShrink: 0 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={onWatchNow}
                    >
                      <div className="rail-tile__poster-wrap">
                        <img
                          src={item.image}
                          alt=""
                          className="rail-tile__thumb-img"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="rail-tile__play" aria-hidden="true" />
                      </div>
                      <h4 className="rail-tile__title" title={item.title}>
                        {item.title}
                      </h4>
                      <p className="rail-tile__meta">{item.meta}</p>
                    </motion.article>
                  ))}
                </div>
                <div className="watch-row__fade" aria-hidden="true" />
              </div>
            </section>
          ))
        )}
      </div>

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
