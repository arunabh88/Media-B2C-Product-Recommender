import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icons } from '../components/Icons'
import { Modal } from '../components/Modal'
import type { BundleDefinition } from '../data/bundles'

interface Screen3ValidationProps {
  selectedBundle: BundleDefinition | null | undefined
  onNext: () => void
  onBack?: () => void
}

const CHIPS = [
  { id: 'device', label: 'Device detected' },
  { id: 'network', label: 'Network speed detected' },
  { id: 'location', label: 'Location/availability' },
]

const DEVICE_OPTIONS = [
  { id: 'mobile', label: 'Mobile' },
  { id: 'tv', label: 'TV' },
  { id: 'both', label: 'Both' },
]

export function Screen3Validation({ selectedBundle, onNext, onBack }: Screen3ValidationProps) {
  const [deviceModalOpen, setDeviceModalOpen] = useState(false)
  const [devicePreference, setDevicePreference] = useState<string>('both')
  const [lowBandwidth] = useState(false)
  const [regionUnavailable] = useState(false)

  return (
    <motion.div
      key="screen3-validation"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{ maxWidth: 520, margin: '0 auto' }}
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

      <h2 className="slds-text-heading_medium slds-m-bottom_small">Validating your setup</h2>
      <p className="slds-text-body_regular slds-text-color_weak slds-m-bottom_medium">
        We&apos;re checking what works best on your devices — no action needed.
      </p>

      <div className="slds-m-bottom_medium">
        <div className="slds-grid slds-wrap slds-gutters_x-small">
          {CHIPS.map((chip) => (
            <span
              key={chip.id}
              className="slds-badge slds-badge_lightest slds-theme_success"
              style={{ marginBottom: 4 }}
            >
              {chip.label}
            </span>
          ))}
        </div>
      </div>

      {lowBandwidth && (
        <div className="slds-box slds-box_x-small slds-m-bottom_medium" style={{ background: 'var(--slds-g-neutral-95, #f3f3f3)' }}>
          <p className="slds-text-body_small">
            We&apos;ll start you on HD to avoid buffering. You can upgrade anytime.
          </p>
        </div>
      )}

      {regionUnavailable && (
        <div className="slds-box slds-box_x-small slds-m-bottom_medium slds-theme_warning">
          <p className="slds-text-body_small">
            This plan isn&apos;t available in your area. We&apos;ve picked the closest match.
          </p>
        </div>
      )}

      {selectedBundle && (
        <div className="slds-summary-detail slds-m-bottom_large">
          <div className="slds-summary-detail__content">
            <p className="slds-text-body_small slds-text-color_weak">
              Plan: <strong>{selectedBundle.name}</strong> — {selectedBundle.priceDisplay}
            </p>
          </div>
        </div>
      )}

      <div className="slds-m-bottom_medium">
        <button
          type="button"
          className="slds-button slds-button_brand slds-button_stretch"
          onClick={onNext}
        >
          Continue
        </button>
      </div>

      <button
        type="button"
        className="slds-button slds-button_link slds-text-body_small"
        onClick={() => setDeviceModalOpen(true)}
      >
        Change Device
      </button>

      <Modal
        open={deviceModalOpen}
        onClose={() => setDeviceModalOpen(false)}
        title="Change device"
      >
        <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_medium">
          Select how you&apos;ll watch.
        </p>
        <div className="slds-form-element" role="group">
          <div className="slds-form-element__control">
            {DEVICE_OPTIONS.map((opt) => (
              <div key={opt.id} className="slds-radio slds-m-bottom_small">
                <input
                  type="radio"
                  id={`device-${opt.id}`}
                  name="device"
                  value={opt.id}
                  checked={devicePreference === opt.id}
                  onChange={() => setDevicePreference(opt.id)}
                  className="slds-radio__input"
                />
                <label className="slds-radio__label" htmlFor={`device-${opt.id}`}>
                  {opt.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="slds-m-top_medium">
          <button
            type="button"
            className="slds-button slds-button_brand"
            onClick={() => setDeviceModalOpen(false)}
          >
            Done
          </button>
        </div>
      </Modal>
    </motion.div>
  )
}
