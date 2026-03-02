import { motion } from 'framer-motion'
import { Icons } from '../components/Icons'

interface Screen4ActivationProps {
  onWatchNow: () => void
}

const RAIL_ITEMS = [
  { id: '1', title: 'Documentary: Racing the Sun', meta: '4K · Sports' },
  { id: '2', title: 'HBO: House of the Dragon', meta: 'Drama · 4K' },
  { id: '3', title: 'F1: Monaco GP Highlights', meta: 'Live · Sports' },
  { id: '4', title: 'Nature: Planet Earth III', meta: '4K · Documentary' },
]

export function Screen4Activation({ onWatchNow }: Screen4ActivationProps) {
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
              <h2 className="slds-text-heading_medium slds-m-bottom_x-small">You’re all set</h2>
              <p className="slds-text-body_regular slds-text-color_weak">
                Your bundle is active. Start watching in seconds.
              </p>
              <div className="slds-m-top_medium">
                <button
                  type="button"
                  className="slds-button slds-button_brand"
                  onClick={onWatchNow}
                >
                  Watch Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Watch Now rail - content related to initial prompt */}
      <section className="slds-m-top_large" aria-label="Watch Now">
        <h3 className="slds-text-heading_small slds-m-bottom_medium">Watch Now — Picked for you</h3>
        <div
          className="slds-grid slds-wrap slds-gutters_small"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}
        >
          {RAIL_ITEMS.map((item, i) => (
            <motion.article
              key={item.id}
              className="slds-card"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.3 }}
              style={{ cursor: 'pointer' }}
              whileHover={{ y: -4 }}
              onClick={onWatchNow}
            >
              <div className="slds-card__body slds-card__body_inner">
                <div
                  className="slds-media slds-media_center"
                  style={{ aspectRatio: '16/9', background: 'var(--slds-g-neutral-90, #e5e5e5)', borderRadius: 4 }}
                >
                  <span className="slds-icon_container slds-icon-utility-play" style={{ opacity: 0.7 }}>
                    {Icons.play}
                  </span>
                </div>
                <h4 className="slds-text-body_small slds-m-top_x-small slds-truncate" title={item.title}>
                  {item.title}
                </h4>
                <p className="slds-text-body_small slds-text-color_weak">{item.meta}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
