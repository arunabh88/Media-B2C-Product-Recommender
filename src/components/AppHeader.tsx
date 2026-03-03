import { useState, useEffect } from 'react'
import { Icons } from './Icons'
import type { StepValue } from './ProgressIndicator'

interface AppHeaderProps {
  currentStep?: StepValue
  onLogoClick?: () => void
  /** Home: go to discovery (landing) */
  onHomeClick?: () => void
  /** Find Plans: go to discovery and show plans (e.g. open browse modal) */
  onFindPlansClick?: () => void
  /** Watch: go to activation */
  onMyLibraryClick?: () => void
}

const NAV_LINKS: { label: string; href: string; navKey: 'home' | 'discover' | 'library' }[] = [
  { label: 'Home', href: '#home', navKey: 'home' },
  { label: 'Find Plans', href: '#plans', navKey: 'discover' },
  { label: 'Watch', href: '#watch', navKey: 'library' },
]

function renderNavLinks(
  currentStep: StepValue | undefined,
  onHomeClick?: () => void,
  onFindPlansClick?: () => void,
  onMyLibraryClick?: () => void,
  onNavClick?: () => void
) {
  return NAV_LINKS.map((link) => {
    const handleNav =
      link.navKey === 'library' ? onMyLibraryClick :
      link.navKey === 'home' ? onHomeClick :
      onFindPlansClick
    const isActive =
      link.navKey === 'home' && currentStep === 'discovery' ||
      link.navKey === 'discover' && currentStep === 'bundle' ||
      link.navKey === 'library' && currentStep === 'activation'
    const clickHandler = () => {
      handleNav?.()
      onNavClick?.()
    }
    if (handleNav) {
      return (
        <button
          key={link.label}
          type="button"
          className={`app-header__nav-link app-header__nav-link--button ${isActive ? 'app-header__nav-link--active' : ''}`}
          onClick={clickHandler}
        >
          {link.label}
        </button>
      )
    }
    return (
      <a key={link.label} href={link.href} className="app-header__nav-link">
        {link.label}
      </a>
    )
  })
}

export function AppHeader({ currentStep, onLogoClick, onHomeClick, onFindPlansClick, onMyLibraryClick }: AppHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setMobileMenuOpen(false)
      }
      document.addEventListener('keydown', onKeyDown)
      return () => {
        document.body.style.overflow = ''
        document.removeEventListener('keydown', onKeyDown)
      }
    }
  }, [mobileMenuOpen])

  const brandContent = (
    <>
      <span className="app-header__logo" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="6" fill="currentColor" fillOpacity="0.9" />
          <path d="M12 10v12l10-6-10-6z" fill="#fff" />
        </svg>
      </span>
      <span className="app-header__name">StreamMax</span>
    </>
  )

  return (
    <header className="app-header" role="banner">
      <div className="app-header__inner">
        {/* Left: Hamburger (mobile) + Logo + separator + Nav */}
        <div className="app-header__left">
          <button
            type="button"
            className="app-header__hamburger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            {Icons.menu}
          </button>
          {onLogoClick ? (
            <button type="button" className="app-header__brand as-button" onClick={onLogoClick} aria-label="Go to home">
              {brandContent}
            </button>
          ) : (
            <div className="app-header__brand">{brandContent}</div>
          )}
          <span className="app-header__separator" aria-hidden="true" />
          <nav className="app-header__nav" aria-label="Main">
            {renderNavLinks(currentStep, onHomeClick, onFindPlansClick, onMyLibraryClick)}
          </nav>
        </div>

        {/* Right: Notification, Help, Profile */}
        <div className="app-header__right">
          <button type="button" className="app-header__icon-btn" aria-label="Notifications">
            {Icons.bell}
          </button>
          <button type="button" className="app-header__icon-btn" aria-label="Help">
            {Icons.help}
          </button>
          <button type="button" className="app-header__icon-btn" aria-label="Profile">
            {Icons.userAction}
          </button>
        </div>
      </div>

      {/* Mobile menu: overlay + slide-out panel with nav */}
      {mobileMenuOpen && (
        <>
          <div
            className="app-header__menu-backdrop"
            onClick={() => setMobileMenuOpen(false)}
            role="button"
            tabIndex={-1}
            aria-label="Close menu"
          />
          <div className="app-header__menu-panel" role="dialog" aria-label="Main navigation">
            <div className="app-header__menu-header">
              <span className="app-header__menu-title">Menu</span>
              <button
                type="button"
                className="app-header__menu-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                {Icons.close}
              </button>
            </div>
            <nav className="app-header__menu-nav" aria-label="Main">
              {renderNavLinks(currentStep, onHomeClick, onFindPlansClick, onMyLibraryClick, () => setMobileMenuOpen(false))}
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
