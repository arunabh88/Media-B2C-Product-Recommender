import { motion } from 'framer-motion'

interface Screen3CheckoutProps {
  onNext: () => void
}

const LINE_ITEMS = [
  { label: 'The Ultimate Cinephile Pack', value: '$64.99/mo' },
  { label: 'Mobile Customer Credit', value: '-$10.00' },
]
const TOTAL_LABEL = 'Total today'
const TOTAL_VALUE = '$54.99/mo'

export function Screen3Checkout({ onNext }: Screen3CheckoutProps) {
  return (
    <motion.div
      key="screen3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ maxWidth: 420, margin: '0 auto' }}
    >
      <h2 className="slds-text-heading_medium slds-m-bottom_medium">Checkout</h2>

      <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_small">
        Signed in with Apple — we’ve pre-filled your details and confirmed 18+.
      </p>

      <div className="slds-summary-detail slds-m-bottom_large">
        <div className="slds-summary-detail__content">
          <dl className="slds-dl_horizontal slds-dl_inline">
            {LINE_ITEMS.map((item) => (
              <div key={item.label} className="slds-item slds-m-bottom_small">
                <dt className="slds-dl_horizontal__label slds-text-body_small">{item.label}</dt>
                <dd className="slds-dl_horizontal__detail slds-tile__meta slds-text-body_small">
                  {item.value}
                </dd>
              </div>
            ))}
            <div className="slds-item slds-m-top_small slds-p-top_small" style={{ borderTop: '1px solid #e5e5e5' }}>
              <dt className="slds-dl_horizontal__label slds-text-body_regular slds-text-title">
                {TOTAL_LABEL}
              </dt>
              <dd className="slds-dl_horizontal__detail slds-tile__meta slds-text-heading_small">
                {TOTAL_VALUE}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_small">
        Pay with your saved method or choose below.
      </p>
      <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_medium">
        We’ve defaulted to Apple Pay — confirm with a double-click.
      </p>

      <div className="slds-grid slds-wrap slds-gutters_small slds-m-bottom_medium">
        <motion.button
          type="button"
          className="slds-button slds-button_neutral slds-size_1-of-1 slds-m-bottom_small"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          onClick={onNext}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19z" />
          </svg>
          Apple Pay
        </motion.button>
        <motion.button
          type="button"
          className="slds-button slds-button_outline-brand slds-size_1-of-1"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          onClick={onNext}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google Pay
        </motion.button>
      </div>

      <button type="button" className="slds-button slds-button_link slds-text-body_small" onClick={onNext}>
        Use card or other payment method
      </button>
    </motion.div>
  )
}
