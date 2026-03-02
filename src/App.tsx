import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ProgressIndicator, type StepValue } from './components/ProgressIndicator'
import { Modal } from './components/Modal'
import { Screen1Discovery } from './screens/Screen1Discovery'
import { Screen2Bundle } from './screens/Screen2Bundle'
import { Screen3Checkout } from './screens/Screen3Checkout'
import { Screen4Activation } from './screens/Screen4Activation'

const STEPS: StepValue[] = ['discovery', 'bundle', 'checkout', 'activation']

export default function App() {
  const [step, setStep] = useState<StepValue>('discovery')
  const [prompt, setPrompt] = useState('')
  const [priceBreakdownOpen, setPriceBreakdownOpen] = useState(false)

  const goTo = (next: StepValue) => setStep(next)

  const handleDiscoveryNext = (value: string) => {
    setPrompt(value)
    goTo('bundle')
  }

  const handleWatchNow = () => {
    // Could open external player or in-app; for prototype just a no-op or reset
    if (step === 'activation') return
    goTo('activation')
  }

  return (
    <div className="app">
      {/* Top: Progress indicator - full width */}
      <ProgressIndicator currentStep={step} />

      {/* Desktop sidebar - visible from 768px via App.css */}
      <aside className="sidebar" aria-label="Progress">
        <nav className="slds-nav-vertical" aria-label="Steps">
          {STEPS.map((s) => (
            <span
              key={s}
              className={`slds-nav-vertical__item ${step === s ? 'slds-is-active' : ''}`}
              style={{ textTransform: 'capitalize' }}
            >
              {s.replace('_', ' ')}
            </span>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {step === 'discovery' && <Screen1Discovery key="1" onNext={handleDiscoveryNext} />}
          {step === 'bundle' && (
            <Screen2Bundle
              key="2"
              prompt={prompt}
              onNext={() => goTo('checkout')}
              onPriceBreakdown={() => setPriceBreakdownOpen(true)}
            />
          )}
          {step === 'checkout' && (
            <Screen3Checkout key="3" onNext={() => goTo('activation')} />
          )}
          {step === 'activation' && (
            <Screen4Activation key="4" onWatchNow={handleWatchNow} />
          )}
        </AnimatePresence>
      </main>

      <Modal
        open={priceBreakdownOpen}
        onClose={() => setPriceBreakdownOpen(false)}
        title="Price breakdown"
      >
        <div className="slds-summary-detail">
          <dl className="slds-dl_horizontal slds-dl_inline">
            <div className="slds-item slds-m-bottom_small">
              <dt className="slds-dl_horizontal__label">Base plan</dt>
              <dd className="slds-dl_horizontal__detail">$49.99/mo</dd>
            </div>
            <div className="slds-item slds-m-bottom_small">
              <dt className="slds-dl_horizontal__label">HBO Max</dt>
              <dd className="slds-dl_horizontal__detail">$9.99/mo</dd>
            </div>
            <div className="slds-item slds-m-bottom_small">
              <dt className="slds-dl_horizontal__label">4K Ultra HD</dt>
              <dd className="slds-dl_horizontal__detail">$4.99/mo</dd>
            </div>
            <div className="slds-item slds-m-bottom_small">
              <dt className="slds-dl_horizontal__label">Sports Plus</dt>
              <dd className="slds-dl_horizontal__detail">$7.99/mo</dd>
            </div>
            <div className="slds-item slds-m-bottom_small">
              <dt className="slds-dl_horizontal__label">DVR 500hr</dt>
              <dd className="slds-dl_horizontal__detail">$12.99/mo</dd>
            </div>
            <div className="slds-item slds-m-bottom_small slds-theme_success">
              <dt className="slds-dl_horizontal__label">Mobile Customer Credit</dt>
              <dd className="slds-dl_horizontal__detail">-$10.00/mo</dd>
            </div>
            <div className="slds-item slds-m-top_small slds-p-top_small" style={{ borderTop: '1px solid #e5e5e5' }}>
              <dt className="slds-dl_horizontal__label slds-text-title">Total</dt>
              <dd className="slds-dl_horizontal__detail slds-text-heading_small">$54.99/mo</dd>
            </div>
          </dl>
        </div>
      </Modal>
    </div>
  )
}
