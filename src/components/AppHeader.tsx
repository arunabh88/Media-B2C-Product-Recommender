import { Icons } from './Icons'
import type { StepValue } from './ProgressIndicator'

interface AppHeaderProps {
  currentStep?: StepValue
  onLogoClick?: () => void
  /** Home and Discover both go to discovery */
  onHomeOrDiscoverClick?: () => void
  /** My Library: go to activation or open modal */
  onMyLibraryClick?: () => void
}

const NAV_LINKS: { label: string; href: string; navKey: 'home' | 'discover' | 'library' }[] = [
  { label: 'Home', href: '#home', navKey: 'home' },
  { label: 'Discover', href: '#discover', navKey: 'discover' },
  { label: 'My Library', href: '#library', navKey: 'library' },
]

export function AppHeader({ currentStep, onLogoClick, onHomeOrDiscoverClick, onMyLibraryClick }: AppHeaderProps) {
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
        {/* Left: Logo + separator + Nav */}
        <div className="app-header__left">
          {onLogoClick ? (
            <button type="button" className="app-header__brand as-button" onClick={onLogoClick} aria-label="Go to home">
              {brandContent}
            </button>
          ) : (
            <div className="app-header__brand">{brandContent}</div>
          )}
          <span className="app-header__separator" aria-hidden="true" />
          <nav className="app-header__nav" aria-label="Main">
            {NAV_LINKS.map((link) => {
              const handleNav = link.navKey === 'library' ? onMyLibraryClick : onHomeOrDiscoverClick
              const isActive =
                link.navKey === 'home' && currentStep === 'discovery' ||
                link.navKey === 'library' && currentStep === 'activation'
              if (handleNav) {
                return (
                  <button
                    key={link.label}
                    type="button"
                    className={`app-header__nav-link app-header__nav-link--button ${isActive ? 'app-header__nav-link--active' : ''}`}
                    onClick={handleNav}
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
            })}
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
    </header>
  )
}
