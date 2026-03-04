import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icons } from '../components/Icons'
import { Modal } from '../components/Modal'
import type { BundleDefinition } from '../data/bundles'

interface Screen3ValidationProps {
  selectedBundle: BundleDefinition | null | undefined
  onNext: () => void
  onBack?: () => void
}

const VALIDATION_STEPS = [
  { id: 'device', checkingLabel: 'Checking device ...', doneLabel: 'Device detected' },
  { id: 'network', checkingLabel: 'Checking Network speed...', doneLabel: 'Network speed detected' },
  { id: 'location', checkingLabel: 'Checking location/availability...', doneLabel: 'Available in the location' },
]

const DEVICE_OPTIONS = [
  { id: 'mobile', label: 'Mobile' },
  { id: 'tv', label: 'TV' },
  { id: 'both', label: 'Both' },
] as const

type DeviceId = (typeof DEVICE_OPTIONS)[number]['id']

function toggleDeviceSelection(
  prev: Set<DeviceId>,
  optId: DeviceId,
  checked: boolean
): Set<DeviceId> {
  const next = new Set(prev)
  if (optId === 'both') {
    if (checked) {
      next.add('mobile')
      next.add('tv')
      next.add('both')
    } else {
      next.delete('mobile')
      next.delete('tv')
      next.delete('both')
    }
    return next
  }
  if (checked) {
    next.add(optId)
    const hasMobile = next.has('mobile')
    const hasTv = next.has('tv')
    if (hasMobile && hasTv) next.add('both')
  } else {
    next.delete(optId)
    next.delete('both')
  }
  return next
}

function watchingOnLabel(selected: Set<DeviceId>): string {
  if (selected.size === 0) return '—'
  const hasBoth = selected.has('both')
  const hasMobile = selected.has('mobile')
  const hasTv = selected.has('tv')
  if (hasBoth || (hasMobile && hasTv)) return 'Mobile and TV'
  if (hasMobile) return 'Mobile'
  if (hasTv) return 'TV'
  return '—'
}

export function Screen3Validation({ selectedBundle, onNext, onBack }: Screen3ValidationProps) {
  const [deviceModalOpen, setDeviceModalOpen] = useState(false)
  const [selectedDevices, setSelectedDevices] = useState<Set<DeviceId>>(new Set(['both']))
  const [validationStep, setValidationStep] = useState(0)
  const [validationComplete, setValidationComplete] = useState(false)
  const [lowBandwidth] = useState(false)
  const [regionUnavailable] = useState(false)

  useEffect(() => {
    if (validationComplete) return
    const t1 = setTimeout(() => setValidationStep(1), 800)
    const t2 = setTimeout(() => setValidationStep(2), 1600)
    const t3 = setTimeout(() => setValidationStep(3), 2400)
    const t4 = setTimeout(() => setValidationComplete(true), 2400)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [validationComplete])

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
        <p className="slds-text-body_small slds-m-bottom_x-small">
          Watching on: {watchingOnLabel(selectedDevices)}
          {' · '}
          <button
            type="button"
            className="slds-button slds-button_link slds-button_link_inline slds-p-horizontal_xxx-small"
            onClick={() => setDeviceModalOpen(true)}
          >
            Change device
          </button>
        </p>
      </div>

      <ul className="validation-steps-list slds-m-bottom_medium" role="list" aria-live="polite" aria-label="Validation progress">
        {VALIDATION_STEPS.map((step, index) => {
          if (index > validationStep) return null
          const isDone = validationStep > index
          return (
            <li key={step.id} className="validation-step-row">
              <span className="validation-step-tick" aria-hidden="true">
                {isDone ? (
                  <span className="slds-icon_container slds-icon-utility-success validation-step-tick-icon">
                    {Icons.success}
                  </span>
                ) : (
                  <span className="validation-step-pending" aria-hidden="true" />
                )}
              </span>
              {isDone ? (
                <span className="validation-step-label validation-step-label--done">{step.doneLabel}</span>
              ) : (
                <motion.span
                  className="validation-step-label validation-step-label--checking"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                >
                  {step.checkingLabel}
                </motion.span>
              )}
            </li>
          )
        })}
      </ul>

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
          disabled={!validationComplete}
          aria-disabled={!validationComplete}
        >
          Continue
        </button>
      </div>

      <Modal
        open={deviceModalOpen}
        onClose={() => setDeviceModalOpen(false)}
        title="Change device"
        footer={
          <>
            <button
              type="button"
              className="slds-button slds-button_neutral"
              onClick={() => setDeviceModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="slds-button slds-button_brand"
              onClick={() => setDeviceModalOpen(false)}
            >
              Done
            </button>
          </>
        }
      >
        <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_medium">
          Select how you&apos;ll watch.
        </p>
        <div className="slds-form-element" role="group" aria-label="How you'll watch">
          <div className="slds-form-element__control">
            {DEVICE_OPTIONS.map((opt) => (
              <label
                key={opt.id}
                className="slds-checkbox slds-m-bottom_small"
                htmlFor={`device-${opt.id}`}
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
              >
                <input
                  type="checkbox"
                  id={`device-${opt.id}`}
                  checked={selectedDevices.has(opt.id)}
                  onChange={(e) => {
                    setSelectedDevices((prev) =>
                      toggleDeviceSelection(prev, opt.id, e.target.checked)
                    )
                  }}
                />
                <span className="slds-checkbox_faux" aria-hidden="true" />
                <span className="slds-form-element__label slds-m-left_x-small">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      </Modal>
    </motion.div>
  )
}
