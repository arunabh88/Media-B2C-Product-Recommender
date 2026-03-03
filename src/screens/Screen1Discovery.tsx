import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Icons } from '../components/Icons'
import { Modal } from '../components/Modal'
import { BUNDLES } from '../data/bundles'

const INSPIRATION_CHIPS = [
  'Live F1 races and 4K nature docs',
  'Live F1 & Documentaries',
  'HBO Hits & 4K Movies',
  'Kids Shows & Family Favorites',
]

const IMPORT_SERVICES: { id: 'spotify' | 'netflix' | 'youtube'; name: string; description: string }[] = [
  { id: 'spotify', name: 'Spotify', description: "Music and podcasts – we'll infer your taste" },
  { id: 'netflix', name: 'Netflix', description: "We'll use your viewing history" },
  { id: 'youtube', name: 'YouTube', description: "We'll use your watch history" },
]

/** Official logo URLs – Spotify & Netflix from Wikimedia (square icons, no distortion). */
const IMPORT_SERVICE_LOGO_URLS: Record<'spotify' | 'netflix' | 'youtube', string> = {
  spotify: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
  netflix: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg',
  youtube: '',
}

// Web Speech API types (not in all TS libs)
declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
}
interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onresult: ((e: SpeechRecognitionResultEvent) => void) | null
  onend: (() => void) | null
  onerror: ((e: { error: string }) => void) | null
}
interface SpeechRecognitionResultEvent {
  resultIndex: number
  results: Array<{ length: number; isFinal: boolean; 0: { transcript: string }; [i: number]: { transcript: string } }>
}

interface Screen1Props {
  initialPrompt?: string
  onNext: (prompt: string) => void
  onBrowsePlanSelect?: (bundleId: string) => void
  /** When provided, Browse Popular Plans modal is controlled by parent (e.g. from header Find Plans) */
  browseModalOpen?: boolean
  onBrowseModalOpen?: () => void
  onBrowseModalClose?: () => void
}

export function Screen1Discovery({ initialPrompt = '', onNext, onBrowsePlanSelect, browseModalOpen: controlledBrowseOpen, onBrowseModalOpen, onBrowseModalClose }: Screen1Props) {
  const [prompt, setPrompt] = useState(initialPrompt)
  const [importModalOpen, setImportModalOpen] = useState(false)
  const [importStep, setImportStep] = useState<'choose' | 'consent' | 'connecting' | 'success'>('choose')
  const [importService, setImportService] = useState<'spotify' | 'netflix' | 'youtube' | null>(null)
  const [consentChecked, setConsentChecked] = useState(false)
  const [localBrowseModalOpen, setLocalBrowseModalOpen] = useState(false)
  const browseModalOpen = onBrowseModalOpen !== undefined ? (controlledBrowseOpen ?? false) : localBrowseModalOpen
  const setBrowseModalOpen = (open: boolean) => {
    if (onBrowseModalOpen !== undefined) {
      if (open) onBrowseModalOpen()
      else onBrowseModalClose?.()
    } else {
      setLocalBrowseModalOpen(open)
    }
  }
  const [listening, setListening] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [emptyError, setEmptyError] = useState(false)
  const [micDenied, setMicDenied] = useState(false)
  const [broadClarification, setBroadClarification] = useState(false)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const promptWhenStartedRef = useRef('')
  const finalTranscriptRef = useRef('')
  const promptRef = useRef(prompt)
  promptRef.current = prompt

  useEffect(() => {
    if (initialPrompt) setPrompt(initialPrompt)
  }, [initialPrompt])

  const stopListening = useCallback(() => {
    const rec = recognitionRef.current
    if (rec) {
      try { rec.stop() } catch (_) { /* noop */ }
      recognitionRef.current = null
    }
    setListening(false)
  }, [])

  const startVoiceInput = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      promptWhenStartedRef.current = promptRef.current
      finalTranscriptRef.current = ''
      const rec = new SpeechRecognition()
      rec.continuous = false
      rec.interimResults = true
      rec.lang = 'en-US'
      rec.onresult = (e: SpeechRecognitionResultEvent) => {
        let interim = ''
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const result = e.results[i]
          const transcript = (result[0]?.transcript ?? '').trim()
          if (!transcript) continue
          if (result.isFinal) {
            finalTranscriptRef.current += (finalTranscriptRef.current ? ' ' : '') + transcript
          } else {
            interim += (interim ? ' ' : '') + transcript
          }
        }
        const base = promptWhenStartedRef.current.trim()
        const session = (finalTranscriptRef.current + (interim ? ' ' + interim : '')).trim()
        const next = base ? (session ? `${base} ${session}` : base) : session
        setPrompt(next)
      }
      rec.onend = () => setListening(false)
      rec.onerror = (e: { error: string }) => {
        setListening(false)
        if (e.error === 'not-allowed' || e.error === 'permission-denied') setMicDenied(true)
      }
      recognitionRef.current = rec
      setListening(true)
      try { rec.start() } catch {
        setListening(false)
        setMicDenied(true)
      }
      return
    }
    // Fallback: mock voice input
    setListening(true)
    setTimeout(() => {
      setPrompt((p) => (p ? `${p} live sports and 4K documentaries` : 'live sports and 4K documentaries').trim())
      setListening(false)
    }, 800)
  }, [])

  useEffect(() => () => stopListening(), [stopListening])

  useEffect(() => {
    if (importStep !== 'connecting' || !importService) return
    const t = setTimeout(() => setImportStep('success'), 1500)
    return () => clearTimeout(t)
  }, [importStep, importService])

  const handleImportModalClose = () => {
    setImportModalOpen(false)
    setImportStep('choose')
    setImportService(null)
    setConsentChecked(false)
  }

  const handleImportSuccess = () => {
    const mockPrompt = importService ? `Imported from ${IMPORT_SERVICES.find((s) => s.id === importService)?.name ?? importService}` : 'Imported taste'
    handleImportModalClose()
    onNext(mockPrompt)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEmptyError(false)
    const value = prompt.trim()
    if (!value) {
      setEmptyError(true)
      return
    }
    const isBroad = /^(everything|anything|all)$/i.test(value) || value.length < 3
    if (isBroad) setBroadClarification(true)
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setBroadClarification(false)
      onNext(value || INSPIRATION_CHIPS[0])
    }, 1500)
  }

  const handleChipClick = (label: string) => {
    setPrompt(label)
    setEmptyError(false)
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      onNext(label)
    }, 1200)
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
      {processing ? (
        <div className="slds-grid slds-grid_vertical-align-center" style={{ minHeight: '40vh', flexDirection: 'column' }}>
          <div className="slds-spinner slds-spinner_medium" role="status" aria-label="Loading">
            <span className="slds-assistive-text">Loading</span>
            <div className="slds-spinner__dot-a" />
            <div className="slds-spinner__dot-b" />
          </div>
          <p className="slds-m-top_medium slds-text-body_regular slds-text-color_weak">
            Understanding your preferences…
          </p>
          {broadClarification && (
            <p className="slds-m-top_small slds-text-body_small slds-text-color_weak">
              Got it — we&apos;ll start broad and fine-tune later.
            </p>
          )}
        </div>
      ) : (
        <>
      <div className="slds-text-align_center slds-m-bottom_large">
        <h1 className="slds-text-heading_large slds-m-bottom_small discovery-heading">
          What do you love to watch?
        </h1>
        <p className="discovery-tagline slds-text-body_regular slds-text-color_weak slds-m-bottom_x-small">
          We’ll recommend the perfect bundle for you.
        </p>
      </div>

      <form id="discovery-form" onSubmit={handleSubmit} className="slds-form" style={{ width: '100%', maxWidth: 560, margin: '0 auto' }}>
        <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_small slds-text-align_center discovery-search-hint">
          Say or type what you love — no genre boxes. No commitment. Cancel anytime.
        </p>
        <div className="slds-form-element slds-m-bottom_medium">
          <div className={`discovery-search-wrap slds-form-element__control slds-input-has-icon slds-input-has-icon_left-right${prompt.trim() ? ' has-clear' : ''}`}>
            <span className="slds-icon_container slds-input__icon slds-input__icon_left discovery-search-icon">
              {Icons.search}
            </span>
            <input
              id="discovery-prompt"
              type="search"
              className="slds-input"
              placeholder="Tell us what you love to watch — sports, movies, live TV, anything."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              aria-label="Describe what you love to watch"
              autoFocus
            />
            {prompt.trim() ? (
              <button
                type="button"
                className="discovery-search-clear slds-input__icon slds-input__icon_right slds-button slds-button_icon"
                onClick={() => setPrompt('')}
                aria-label="Clear transcript"
              >
                {Icons.close}
              </button>
            ) : null}
            <button
              type="button"
              className={`discovery-search-mic slds-button slds-button_icon${listening ? ' discovery-search-mic--active' : ''}`}
              onClick={listening ? stopListening : startVoiceInput}
              aria-label={listening ? 'Stop listening' : 'Voice input'}
              title={listening ? 'Stop' : 'Speak'}
            >
              {Icons.custom35}
            </button>
          </div>
        </div>
          {emptyError && (
            <p className="slds-form-element__help slds-m-top_x-small slds-text-color_weak">
              You can type just one thing, like &ldquo;cricket&rdquo; or &ldquo;movies&rdquo;.
            </p>
          )}
          {listening && (
            <p className="slds-form-element__help slds-m-top_x-small slds-text-color_weak">
              Listening… Speak now.{' '}
              <button type="button" className="slds-button slds-button_link slds-text-body_small" onClick={stopListening}>
                Stop
              </button>
            </p>
          )}
          {micDenied && (
            <p className="slds-form-element__help slds-m-top_x-small slds-text-color_weak">
              No worries — you can type instead.
            </p>
          )}

        <div className="discovery-secondary-actions slds-m-bottom_medium slds-text-align_center">
          <button
            type="button"
            className="slds-button slds-button_link slds-text-body_small"
            onClick={() => setBrowseModalOpen(true)}
          >
            Browse Popular Plans
          </button>
          <span className="discovery-secondary-actions__separator" aria-hidden="true" />
          <button
            type="button"
            className="slds-button slds-button_link slds-text-body_small"
            onClick={() => setImportModalOpen(true)}
          >
            Import my taste
          </button>
        </div>

        <div className="discovery-inspiration-wrap slds-m-bottom_medium">
          <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_x-small">Or try one of these:</p>
          <div className="discovery-inspiration-grid slds-grid slds-wrap slds-grid_vertical-align-center">
            {INSPIRATION_CHIPS.map((label) => (
              <motion.button
                key={label}
                type="button"
                className="discovery-inspiration-chip slds-button slds-button_neutral"
                style={{ borderRadius: 9999 }}
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
            Find My Best Plan
          </button>
        </div>
      </form>

        </>
      )}

      <Modal
        open={importModalOpen}
        onClose={handleImportModalClose}
        title="Import My Taste"
        footer={
          importStep === 'consent' ? (
            <>
              <button
                type="button"
                className="slds-button slds-button_neutral slds-modal__footer-back"
                onClick={() => { setImportStep('choose'); setImportService(null) }}
              >
                Back
              </button>
              <button
                type="button"
                className="slds-button slds-button_neutral"
                onClick={handleImportModalClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className="slds-button slds-button_brand"
                disabled={!consentChecked}
                onClick={() => setImportStep('connecting')}
              >
                Continue
              </button>
            </>
          ) : importStep === 'success' ? (
            <>
              <button
                type="button"
                className="slds-button slds-button_neutral slds-modal__footer-back"
                onClick={() => { setImportStep('choose'); setImportService(null) }}
              >
                Back
              </button>
              <button
                type="button"
                className="slds-button slds-button_brand"
                onClick={handleImportSuccess}
              >
                Get my plan
              </button>
            </>
          ) : (
            <button
              type="button"
              className="slds-button slds-button_neutral"
              onClick={handleImportModalClose}
            >
              Cancel
            </button>
          )
        }
      >
        {importStep === 'choose' && (
          <>
            <p className="slds-text-body_regular slds-m-bottom_medium slds-text-align_center">
              We&apos;ll use your watch history to recommend the best plan.
            </p>
            <div className="import-service-options">
              {IMPORT_SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className="import-service-card browse-plan-card slds-box"
                  onClick={() => {
                    setImportService(service.id)
                    setImportStep('consent')
                  }}
                >
                  <span className="import-service-card__logo" aria-hidden="true">
                    {service.id === 'youtube' ? (
                      Icons.youtubeLogo
                    ) : (
                      <img
                        src={IMPORT_SERVICE_LOGO_URLS[service.id]}
                        alt=""
                        className="import-service-logo import-service-logo--img"
                      />
                    )}
                  </span>
                  <h3 className="browse-plan-card__name">{service.name}</h3>
                  <p className="slds-text-body_small slds-text-color_weak">{service.description}</p>
                </button>
              ))}
            </div>
          </>
        )}
        {importStep === 'consent' && importService && (
          <>
            <p className="slds-text-body_regular slds-m-bottom_medium">
              We&apos;ll request access to your {IMPORT_SERVICES.find((s) => s.id === importService)?.name ?? importService} account to map your taste and personalize your plan. We only use this data for recommendations. You can cancel anytime.
            </p>
            <div className="slds-form-element slds-m-bottom_medium">
              <div className="slds-form-element__control">
                <label className="slds-checkbox">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => setConsentChecked(e.target.checked)}
                    aria-describedby="consent-checkbox-description"
                  />
                  <span className="slds-checkbox_faux" />
                  <span id="consent-checkbox-description" className="slds-form-element__label slds-m-left_x-small">
                    I agree to allow StreamMax to access and use my {IMPORT_SERVICES.find((s) => s.id === importService)?.name ?? importService} data to personalize my plan.
                  </span>
                </label>
              </div>
            </div>
          </>
        )}
        {importStep === 'connecting' && importService && (
          <>
            <div className="slds-grid slds-grid_vertical-align-center" style={{ minHeight: 120, flexDirection: 'column' }}>
              <div className="slds-spinner slds-spinner_medium" role="status" aria-label="Loading">
                <span className="slds-assistive-text">Loading</span>
                <div className="slds-spinner__dot-a" />
                <div className="slds-spinner__dot-b" />
              </div>
              <p className="slds-m-top_medium slds-text-body_regular slds-text-color_weak">
                Connecting to {IMPORT_SERVICES.find((s) => s.id === importService)?.name ?? importService}…
              </p>
            </div>
            <p className="slds-m-top_medium">
              <button type="button" className="slds-button slds-button_link" onClick={() => { setImportStep('choose'); setImportService(null) }}>
                Back
              </button>
            </p>
          </>
        )}
        {importStep === 'success' && importService && (
          <p className="slds-text-body_regular slds-m-bottom_medium slds-text-align_center">
            We&apos;ve mapped your taste from {IMPORT_SERVICES.find((s) => s.id === importService)?.name ?? importService}. Here&apos;s your personalized plan.
          </p>
        )}
      </Modal>

      <Modal
        open={browseModalOpen}
        onClose={() => setBrowseModalOpen(false)}
        title="Browse Popular Plans"
        footer={
          <button
            type="button"
            className="slds-button slds-button_neutral"
            onClick={() => setBrowseModalOpen(false)}
          >
            Cancel
          </button>
        }
      >
        <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_medium slds-text-align_center">
          Choose a plan to get started.
        </p>
        <div className="browse-plans-grid">
          {BUNDLES.slice(0, 3).map((bundle, index) => (
            <div
              key={bundle.id}
              className={`browse-plan-card slds-box ${index === 0 ? 'browse-plan-card--ai' : ''}`}
            >
              {index === 0 && (
                <span className="browse-plan-card__badge browse-plan-card__badge--ai">
                  <span className="browse-plan-card__badge-icon">{Icons.sparkle}</span>
                  AI Recommended
                </span>
              )}
              <h3 className="browse-plan-card__name">{bundle.name}</h3>
              <p className="browse-plan-card__price">{bundle.priceDisplay}</p>
              <p className="slds-text-body_small slds-text-color_weak slds-m-bottom_small">{bundle.pitch.slice(0, 80)}…</p>
              <button
                type="button"
                className="slds-button slds-button_brand slds-button_stretch"
                onClick={() => {
                  setBrowseModalOpen(false)
                  if (onBrowsePlanSelect) onBrowsePlanSelect(bundle.id)
                  else onNext(bundle.name)
                }}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </Modal>
    </motion.div>
  )
}
