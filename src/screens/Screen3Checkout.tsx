import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icons } from '../components/Icons'
import { Modal } from '../components/Modal'
import type { BundleDefinition } from '../data/bundles'

interface Screen3CheckoutProps {
  selectedBundle: BundleDefinition | null | undefined
  onNext: () => void
  onBack?: () => void
  registerPrimaryAction?: (fn: () => void) => void
}

const TOTAL_LABEL = 'Total today'

const DUMMY_CARD = {
  number: '4234 1000 1666 4543',
  name: 'Arunabh Mukherjee',
  expiry: '12/28',
  cvc: '123',
}

const DUMMY_UPI_ID = 'arunabh.mukherjee@okaxisbank'

export function Screen3Checkout({ selectedBundle, onNext, onBack, registerPrimaryAction }: Screen3CheckoutProps) {
  const bundleName = selectedBundle?.name ?? 'Your plan'
  const totalValue = selectedBundle?.priceDisplay ?? '$54.99/mo'
  const discountItem = selectedBundle?.breakdown?.find((b) => b.isDiscount)
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [paymentTab, setPaymentTab] = useState<'card' | 'upi'>('card')
  const [processing, setProcessing] = useState(false)
  const [paymentFailed, setPaymentFailed] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [upiId, setUpiId] = useState('')

  const isCardFormComplete = Boolean(cardNumber && nameOnCard && expiry && cvc)
  const isUpiFormComplete = Boolean(upiId.trim())

  const fillCardNumberOnFocus = () => {
    if (cardNumber.trim() === '') setCardNumber(DUMMY_CARD.number)
  }
  const fillNameOnFocus = () => {
    if (nameOnCard.trim() === '') setNameOnCard(DUMMY_CARD.name)
  }
  const fillExpiryOnFocus = () => {
    if (expiry.trim() === '') setExpiry(DUMMY_CARD.expiry)
  }
  const fillCvcOnFocus = () => {
    if (cvc.trim() === '') setCvc(DUMMY_CARD.cvc)
  }
  const fillUpiIdOnFocus = () => {
    if (upiId.trim() === '') setUpiId(DUMMY_UPI_ID)
  }

  const handleConfirmSubscribe = () => {
    setProcessing(true)
    setTimeout(() => { setProcessing(false); onNext() }, 1800)
  }
  const handlePayInModal = () => {
    setPaymentFailed(false)
    if (Math.random() < 0.25) { setPaymentFailed(true); return }
    setPaymentModalOpen(false)
    onNext()
  }

  const handleClosePaymentModal = () => {
    setCardNumber('')
    setNameOnCard('')
    setExpiry('')
    setCvc('')
    setUpiId('')
    setPaymentFailed(false)
    setPaymentModalOpen(false)
  }

  useEffect(() => {
    registerPrimaryAction?.(handleConfirmSubscribe)
  }, [registerPrimaryAction])

  return (
    <motion.div
      key="screen3"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ maxWidth: 420, margin: '0 auto' }}
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
            Back to plans
          </button>
        </div>
      )}

      <h2 className="slds-text-heading_medium slds-m-bottom_medium">Checkout</h2>

      <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_small">
        Signed in with Apple — we&apos;ve pre-filled your details and confirmed 18+.
      </p>

      <div className="slds-summary-detail slds-m-bottom_large">
        <div className="slds-summary-detail__content">
          <dl className="slds-dl_horizontal slds-dl_inline">
            <div className="slds-item slds-m-bottom_small">
              <dt className="slds-dl_horizontal__label slds-text-body_small">{bundleName}</dt>
              <dd className="slds-dl_horizontal__detail slds-tile__meta slds-text-body_small">
                {totalValue}
              </dd>
            </div>
            {discountItem && (
              <div className="slds-item slds-m-bottom_small slds-theme_success">
                <dt className="slds-dl_horizontal__label slds-text-body_small">{discountItem.label}</dt>
                <dd className="slds-dl_horizontal__detail slds-tile__meta slds-text-body_small">
                  {discountItem.value}
                </dd>
              </div>
            )}
            <div className="slds-item slds-m-top_small slds-p-top_small" style={{ borderTop: '1px solid #e5e5e5' }}>
              <dt className="slds-dl_horizontal__label slds-text-body_regular slds-text-title">
                {TOTAL_LABEL}
              </dt>
              <dd className="slds-dl_horizontal__detail slds-tile__meta slds-text-heading_small">
                {totalValue}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_small">
        Pay with your saved method or choose below. Secure payment.
      </p>
      <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_medium">
        We&apos;ve defaulted to Apple Pay — confirm with a double-click.
      </p>

      {processing ? (
        <div className="slds-grid slds-grid_vertical-align-center" style={{ minHeight: 120, flexDirection: 'column' }}>
          <div className="slds-spinner slds-spinner_medium" role="status" aria-label="Loading">
            <span className="slds-assistive-text">Loading</span>
            <div className="slds-spinner__dot-a" />
            <div className="slds-spinner__dot-b" />
          </div>
          <p className="slds-m-top_medium slds-text-body_regular slds-text-color_weak">Securing your subscription…</p>
        </div>
      ) : (
        <>
      <div className="slds-grid slds-wrap slds-gutters_small slds-m-bottom_medium">
        <motion.button
          type="button"
          className="slds-button slds-button_neutral slds-size_1-of-1 slds-m-bottom_small"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          onClick={handleConfirmSubscribe}
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
          onClick={handleConfirmSubscribe}
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

      <button type="button" className="slds-button slds-button_link slds-text-body_small" onClick={() => setPaymentModalOpen(true)}>
        Use Another Payment Method
      </button>
        </>
      )}

      <Modal
        open={paymentModalOpen}
        onClose={handleClosePaymentModal}
        title="Pay with card or UPI"
        footer={
          <button
            type="button"
            className="slds-button slds-button_neutral"
            onClick={handleClosePaymentModal}
          >
            Cancel
          </button>
        }
      >
        <div className="payment-tabs">
          <ul className="payment-tabs__nav" role="tablist" aria-label="Payment method">
            <li className={`payment-tabs__item ${paymentTab === 'card' ? 'payment-tabs__item--active' : ''}`} role="presentation">
              <button
                type="button"
                id="payment-tab-card"
                className="payment-tabs__link"
                role="tab"
                tabIndex={paymentTab === 'card' ? 0 : -1}
                aria-selected={paymentTab === 'card'}
                aria-controls="payment-panel-card"
                onClick={() => setPaymentTab('card')}
              >
                Card
              </button>
            </li>
            <li className={`payment-tabs__item ${paymentTab === 'upi' ? 'payment-tabs__item--active' : ''}`} role="presentation">
              <button
                type="button"
                id="payment-tab-upi"
                className="payment-tabs__link"
                role="tab"
                tabIndex={paymentTab === 'upi' ? 0 : -1}
                aria-selected={paymentTab === 'upi'}
                aria-controls="payment-panel-upi"
                onClick={() => setPaymentTab('upi')}
              >
                UPI
              </button>
            </li>
          </ul>
          <div className="payment-tabs__content">
            <div
              id="payment-panel-card"
              className={`payment-tabs__panel ${paymentTab === 'card' ? '' : 'payment-tabs__panel--hidden'}`}
              role="tabpanel"
              aria-labelledby="payment-tab-card"
              hidden={paymentTab !== 'card'}
            >
            <div className="slds-p-around_medium payment-form">
              <div className="slds-form-element slds-m-bottom_small">
                <label className="slds-form-element__label" htmlFor="card-number">Card number</label>
                <div className="card-number-input-wrap">
                  <input
                    id="card-number"
                    type="text"
                    className={`slds-input ${cardNumber.trim() ? 'card-number-input-with-icon' : ''}`}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    onFocus={fillCardNumberOnFocus}
                  />
                  {cardNumber.trim() && (
                    <span className="card-number-icon" aria-hidden="true">
                      <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mastercard">
                        <circle cx="14" cy="12" r="8" fill="#EB001B"/>
                        <circle cx="22" cy="12" r="8" fill="#F79E1B"/>
                      </svg>
                    </span>
                  )}
                </div>
              </div>
              <div className="slds-form-element slds-m-bottom_small">
                <label className="slds-form-element__label" htmlFor="card-name">Name on card</label>
                <input
                  id="card-name"
                  type="text"
                  className="slds-input"
                  placeholder="Ex. John Miller"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  onFocus={fillNameOnFocus}
                />
              </div>
              <div className="slds-grid slds-gutters_small">
                <div className="slds-col slds-size_1-of-2">
                  <div className="slds-form-element slds-m-bottom_small">
                    <label className="slds-form-element__label" htmlFor="card-exp">Expiry</label>
                    <input
                      id="card-exp"
                      type="text"
                      className="slds-input"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      onFocus={fillExpiryOnFocus}
                    />
                  </div>
                </div>
                <div className="slds-col slds-size_1-of-2">
                  <div className="slds-form-element slds-m-bottom_small">
                    <label className="slds-form-element__label" htmlFor="card-cvc">CVC</label>
                    <input
                      id="card-cvc"
                      type="text"
                      className="slds-input"
                      placeholder="123"
                      maxLength={4}
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      onFocus={fillCvcOnFocus}
                    />
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="slds-button slds-button_link slds-m-top_small payment-form-save-card"
                onClick={() => {}}
              >
                Save this card
              </button>
              <button
                type="button"
                className="slds-button slds-button_brand slds-button_stretch slds-m-top_small"
                disabled={!isCardFormComplete}
                onClick={handlePayInModal}
              >
                Pay {totalValue}
              </button>
              {paymentFailed && (
                <div className="slds-m-top_small slds-theme_error" style={{ padding: '0.5rem', borderRadius: 4 }}>
                  <p className="slds-text-body_small">That didn&apos;t go through. Want to try again or switch methods?</p>
                  <button type="button" className="slds-button slds-button_neutral slds-m-right_x-small slds-m-top_x-small" onClick={handlePayInModal}>Retry</button>
                  <button type="button" className="slds-button slds-button_link slds-m-top_x-small" onClick={() => setPaymentFailed(false)}>Switch method</button>
                </div>
              )}
            </div>
            </div>
            <div
              id="payment-panel-upi"
              className={`payment-tabs__panel ${paymentTab === 'upi' ? '' : 'payment-tabs__panel--hidden'}`}
              role="tabpanel"
              aria-labelledby="payment-tab-upi"
              hidden={paymentTab !== 'upi'}
            >
            <div className="slds-p-around_medium payment-upi">
              <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_small payment-upi-intro">Scan the QR code with your UPI app to pay.</p>
              <div className="upi-qr-wrap" aria-hidden="true">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi%3A%2F%2Fpay%3Fpa%3Dsample%40upi%26pn%3DMediaCloud%26am%3D54.99"
                  alt="Sample UPI QR code — scan with your UPI app"
                  width={140}
                  height={140}
                  className="upi-qr-code"
                />
              </div>
              <p className="slds-text-body_small slds-m-top_small slds-text-color_weak">Or enter your UPI ID below (e.g. name@paytm).</p>
              <div className="upi-id-field-wrap">
                <input
                  type="text"
                  className="slds-input slds-m-top_x-small"
                  placeholder="UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  onFocus={fillUpiIdOnFocus}
                />
                {upiId.trim() && (
                  <span className="upi-verified-badge" aria-label="Verified UPI">Verified UPI</span>
                )}
              </div>
              <button
                type="button"
                className="slds-button slds-button_brand slds-button_stretch slds-m-top_small"
                disabled={!isUpiFormComplete}
                onClick={handlePayInModal}
              >
                Pay {totalValue}
              </button>
              {paymentFailed && (
                <div className="slds-m-top_small slds-theme_error" style={{ padding: '0.5rem', borderRadius: 4 }}>
                  <p className="slds-text-body_small">That didn&apos;t go through. Want to try again or switch methods?</p>
                  <button type="button" className="slds-button slds-button_neutral slds-m-right_x-small slds-m-top_x-small" onClick={handlePayInModal}>Retry</button>
                  <button type="button" className="slds-button slds-button_link slds-m-top_x-small" onClick={() => setPaymentFailed(false)}>Switch method</button>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}
