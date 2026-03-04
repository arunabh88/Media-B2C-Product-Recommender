import { useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import { AppHeader } from './components/AppHeader'
import { ProgressIndicator, type StepValue } from './components/ProgressIndicator'
import { Modal } from './components/Modal'
import { getBundleById, getBreakdownWithoutTotalAndDiscount, computeTotalWithPromo, type BundleDefinition, type PromoOption } from './data/bundles'
import { Screen1Discovery } from './screens/Screen1Discovery'
import { Screen2Bundle } from './screens/Screen2Bundle'
import { Screen3Checkout } from './screens/Screen3Checkout'
import { Screen3Validation } from './screens/Screen3Validation'
import { Screen4Activation } from './screens/Screen4Activation'

export default function App() {
  const [step, setStep] = useState<StepValue>('discovery')
  const [prompt, setPrompt] = useState('')
  const [selectedBundleId, setSelectedBundleId] = useState<string | null>(null)
  const [priceBreakdownBundleId, setPriceBreakdownBundleId] = useState<string | null>(null)
  const [breakdownPromoId, setBreakdownPromoId] = useState<string | null>(null)
  const [browseModalOpen, setBrowseModalOpen] = useState(false)
  const checkoutPrimaryActionRef = useRef<(() => void) | null>(null)

  const goTo = (next: StepValue) => setStep(next)

  const goBack = () => {
    if (step === 'bundle') goTo('discovery')
    else if (step === 'validation') goTo('bundle')
    else if (step === 'checkout') goTo('validation')
    else if (step === 'activation') goTo('checkout')
  }

  const handleDiscoveryNext = (value: string) => {
    setPrompt(value)
    goTo('bundle')
  }

  const handleBundleNext = (bundleId: string) => {
    setSelectedBundleId(bundleId)
    goTo('validation')
  }

  const handleWatchNow = () => {
    if (step === 'activation') return
    goTo('activation')
  }

  const breakdownBundle = priceBreakdownBundleId ? getBundleById(priceBreakdownBundleId) : null
  const selectedBundle = selectedBundleId ? getBundleById(selectedBundleId) : null

  const openPriceBreakdown = (bundleId: string) => {
    setPriceBreakdownBundleId(bundleId)
    setBreakdownPromoId(null)
  }

  return (
    <div className="app">
      <AppHeader
        currentStep={step}
        onLogoClick={() => goTo('discovery')}
        onHomeClick={() => goTo('discovery')}
        onFindPlansClick={() => { goTo('discovery'); setBrowseModalOpen(true) }}
        onMyLibraryClick={() => goTo('activation')}
      />
      <main className="main-content">
        <div className={`main-content-card${step === 'discovery' ? ' main-content-card--discovery' : ''}`}>
          <ProgressIndicator currentStep={step} />
          <div className="main-content-inner">
        <AnimatePresence mode="wait">
          {step === 'discovery' && (
            <Screen1Discovery
              key="1"
              initialPrompt={prompt}
              onNext={handleDiscoveryNext}
              onBrowsePlanSelect={(id) => { setSelectedBundleId(id); goTo('bundle') }}
              browseModalOpen={browseModalOpen}
              onBrowseModalOpen={() => setBrowseModalOpen(true)}
              onBrowseModalClose={() => setBrowseModalOpen(false)}
            />
          )}
          {step === 'bundle' && (
            <Screen2Bundle
              key="2"
              prompt={prompt}
              initialBestFitBundleId={selectedBundleId}
              onNext={handleBundleNext}
              onPriceBreakdown={openPriceBreakdown}
              onBack={goBack}
            />
          )}
          {step === 'validation' && (
            <Screen3Validation
              key="validation"
              selectedBundle={selectedBundle}
              onNext={() => goTo('checkout')}
              onBack={goBack}
            />
          )}
          {step === 'checkout' && (
            <Screen3Checkout
              key="3"
              selectedBundle={selectedBundle}
              onNext={() => goTo('activation')}
              onBack={goBack}
              registerPrimaryAction={(fn) => { checkoutPrimaryActionRef.current = fn }}
            />
          )}
          {step === 'activation' && (
            <Screen4Activation
              key="4"
              selectedBundle={selectedBundle}
              onWatchNow={handleWatchNow}
            />
          )}
        </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Mobile: bottom-fixed primary CTA */}
      <div className="app-bottom-cta" aria-hidden="true">
        {step === 'discovery' && (
          <button type="button" className="slds-button slds-button_brand slds-button_stretch" onClick={() => document.getElementById('discovery-form')?.scrollIntoView({ behavior: 'smooth' })}>
            Find My Best Plan
          </button>
        )}
        {step === 'bundle' && (
          <button type="button" className="slds-button slds-button_brand slds-button_stretch" onClick={() => document.getElementById('bundle-cards')?.scrollIntoView({ behavior: 'smooth' })}>
            See plans
          </button>
        )}
        {step === 'validation' && (
          <button type="button" className="slds-button slds-button_brand slds-button_stretch" onClick={() => goTo('checkout')}>
            Continue
          </button>
        )}
        {step === 'checkout' && (
          <button type="button" className="slds-button slds-button_brand slds-button_stretch" onClick={() => checkoutPrimaryActionRef.current?.()}>
            Confirm & Subscribe
          </button>
        )}
        {step === 'activation' && (
          <button type="button" className="slds-button slds-button_brand slds-button_stretch" onClick={handleWatchNow}>
            Watch Now
          </button>
        )}
      </div>

      <Modal
        open={priceBreakdownBundleId !== null}
        onClose={() => { setPriceBreakdownBundleId(null); setBreakdownPromoId(null) }}
        title={breakdownBundle ? `Price breakdown — ${breakdownBundle.name}` : 'Price breakdown'}
        footer={
          <>
            <button
              type="button"
              className="slds-button slds-button_neutral"
              onClick={() => { setPriceBreakdownBundleId(null); setBreakdownPromoId(null) }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="slds-button slds-button_brand"
              onClick={() => { setPriceBreakdownBundleId(null); setBreakdownPromoId(null) }}
            >
              Done
            </button>
          </>
        }
      >
        {breakdownBundle && (
          <PriceBreakdownContent
            bundle={breakdownBundle}
            selectedPromoId={breakdownPromoId}
            onSelectPromo={setBreakdownPromoId}
          />
        )}
      </Modal>
    </div>
  )
}

function PriceBreakdownContent({
  bundle,
  selectedPromoId,
  onSelectPromo,
}: {
  bundle: BundleDefinition
  selectedPromoId: string | null
  onSelectPromo: (id: string) => void
}) {
  const promos = bundle.promos ?? []
  const selectedPromo: PromoOption | undefined =
    selectedPromoId ? promos.find((p) => p.id === selectedPromoId) : promos[0]
  const effectivePromo = selectedPromo ?? (promos.find((p) => p.isDiscount) ?? undefined)
  const totalDisplay = computeTotalWithPromo(bundle, effectivePromo)
  const lineItems = getBreakdownWithoutTotalAndDiscount(bundle)

  return (
    <div className="price-breakdown-modal">
      <div className="price-breakdown-list">
        {lineItems.map((item, index) => (
          <div key={index} className="price-breakdown-row">
            <span className="price-breakdown-label">{item.label}</span>
            <span className="price-breakdown-value">{item.value}</span>
          </div>
        ))}
      </div>
      {promos.length > 0 && (
        <div className="price-breakdown-row price-breakdown-promo-row">
          <div className="price-breakdown-promo-select-wrap">
            <label id="price-breakdown-promo-label" className="price-breakdown-promo-label">Promo Applied</label>
            <select
              id="price-breakdown-promo"
              className="slds-select price-breakdown-promo-select"
              value={effectivePromo?.id ?? ''}
              onChange={(e) => onSelectPromo(e.target.value)}
              aria-labelledby="price-breakdown-promo-label"
            >
              {promos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <span className="price-breakdown-value">
            {effectivePromo?.isDiscount ? effectivePromo.value : '—'}
          </span>
        </div>
      )}
      <div className="price-breakdown-separator" />
      <div className="price-breakdown-row price-breakdown-total">
        <span className="price-breakdown-label">Total</span>
        <span className="price-breakdown-value">{totalDisplay}</span>
      </div>
    </div>
  )
}
