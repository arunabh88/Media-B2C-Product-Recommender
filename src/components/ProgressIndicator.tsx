import { Icons } from './Icons'

const STEPS = [
  { value: 'discovery', label: 'Discover' },
  { value: 'bundle', label: 'Your Bundle' },
  { value: 'validation', label: 'Validate' },
  { value: 'checkout', label: 'Checkout' },
  { value: 'activation', label: 'Watch' },
] as const

export type StepValue = (typeof STEPS)[number]['value']

interface ProgressIndicatorProps {
  currentStep: StepValue
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const currentIndex = STEPS.findIndex((s) => s.value === currentStep)

  return (
    <div
      className="progress-wrap"
      role="progressbar"
      aria-valuenow={currentIndex + 1}
      aria-valuemin={1}
      aria-valuemax={5}
    >
      <ul className="slds-progress-indicator" style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 0 }}>
        {STEPS.map((step, index) => {
          const isCompleted = index < currentIndex
          const isCurrent = index === currentIndex
          return (
            <li
              key={step.value}
              className={`slds-progress-indicator__step ${isCompleted ? 'slds-is-completed' : ''} ${isCurrent ? 'slds-is-current' : ''}`}
              style={{ flex: '1 1 auto', minWidth: 0 }}
            >
              <div className="slds-progress-indicator__step-indicator">
                {isCompleted ? (
                  <span className="slds-icon_container slds-icon-utility-success">{Icons.success}</span>
                ) : (
                  <span className="slds-progress-indicator__step-number">{index + 1}</span>
                )}
              </div>
              <div className="slds-progress-indicator__step-label">
                <span className="slds-progress-indicator__step-label-content">{step.label}</span>
              </div>
              {index < STEPS.length - 1 && (
                <div className="slds-progress-indicator__step-line" aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
