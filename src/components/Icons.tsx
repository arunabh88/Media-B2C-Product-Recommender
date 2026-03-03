/** Inline SLDS-style icons so the app works without copying SLDS icon assets */
export const Icons = {
  search: (
    <svg className="slds-icon" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M50.7 48.2L35.5 33c2.5-2.9 4-6.6 4-10.7C39.5 10 30.5 1 19.8 1S0 10 0 20.7s9 19.7 19.8 19.7c4.1 0 7.8-1.5 10.7-4l15.2 15.2c.6.6 1.5.6 2.1 0l2.9-2.9c.6-.6.6-1.5 0-2.1zM19.8 35.3c-8.1 0-14.6-6.6-14.6-14.6s6.6-14.6 14.6-14.6 14.6 6.6 14.6 14.6-6.5 14.6-14.6 14.6z" />
    </svg>
  ),
  close: (
    <svg className="slds-icon" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M31.6 26l8.2-8.2c.6-.6.6-1.5 0-2.1l-2.1-2.1c-.6-.6-1.5-.6-2.1 0L27.4 21.8l-8.2-8.2c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l8.2 8.2-8.2 8.2c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0l8.2-8.2 8.2 8.2c.6.6 1.5.6 2.1 0l2.1-2.1c.6-.6.6-1.5 0-2.1L31.6 26z" />
    </svg>
  ),
  /** Menu (hamburger) – three horizontal lines */
  menu: (
    <svg className="slds-icon" viewBox="0 0 52 52" aria-hidden="true">
      <path fill="currentColor" d="M8 14h36v2H8v-2zm0 12h36v2H8v-2zm0 12h36v2H8v-2z" />
    </svg>
  ),
  success: (
    <svg className="slds-icon" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M26 2C12.7 2 2 12.7 2 26s10.7 24 24 24 24-10.7 24-24S39.3 2 26 2zm-3.4 32.2l-8.7-8.7 2.9-2.9 5.8 5.8 12.2-12.2 2.9 2.9-15.1 15z" />
    </svg>
  ),
  play: (
    <svg className="slds-icon" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M38.5 22.1L18.4 8.6c-1-.6-2.3-.6-3.3 0-1 .6-1.6 1.7-1.6 2.9v27c0 1.2.6 2.3 1.6 2.9.5.3 1.1.4 1.6.4.6 0 1.2-.1 1.7-.4l20.1-13.5c1-.6 1.6-1.7 1.6-2.9s-.6-2.3-1.6-2.9z" />
    </svg>
  ),
  opportunity: (
    <svg className="slds-icon" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M26 2C13.3 2 3 12.3 3 25s10.3 23 23 23 23-10.3 23-23S38.7 2 26 2zm0 42c-10.5 0-19-8.5-19-19S15.5 6 26 6s19 8.5 19 19-8.5 19-19 19zm3-20.5v-6c0-.8-.7-1.5-1.5-1.5h-3c-.8 0-1.5.7-1.5 1.5v9c0 .8.7 1.5 1.5 1.5h8c.8 0 1.5-.7 1.5-1.5v-3c0-.8-.7-1.5-1.5-1.5h-4.5z" />
    </svg>
  ),
  chevronLeft: (
    <svg className="slds-icon" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M35 10L18 26l17 16 2.1-2.2-14.8-13.8L37.1 12.2 35 10z" />
    </svg>
  ),
  mic: (
    <svg className="slds-icon" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M26 2c-3.3 0-6 2.7-6 6v14c0 3.3 2.7 6 6 6s6-2.7 6-6V8c0-3.3-2.7-6-6-6zm0 2c2.2 0 4 1.8 4 4v14c0 2.2-1.8 4-4 4s-4-1.8-4-4V8c0-2.2 1.8-4 4-4zm-8 14v6c0 4.4 3.6 8 8 8s8-3.6 8-8v-6h2v6c0 5.2-4 9.5-9 10v6h4v2H19v-2h4v-6c-5-.5-9-4.8-9-10v-6h2z" />
    </svg>
  ),
  /** Modern audio / microphone for voice search – clean filled shape */
  audioMic: (
    <svg className="slds-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.83V21c0 .55.45 1 1 1s1-.45 1-1v-2.18c3.02-.48 5.42-2.83 5.91-5.83.09-.6-.39-1.14-1-1.14z" />
    </svg>
  ),
  /** SLDS custom icon custom35 (microphone) – from Lightning Design System icon library. No slds-icon-custom to avoid SLDS background overriding our SVG. */
  custom35: (
    <svg className="slds-icon discovery-search-mic-icon" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
      <path d="M69 40c-1.7 0-3 1.3-3 3v5c0 8.8-7.2 16-16 16s-16-7.2-16-16v-5c0-1.7-1.3-3-3-3s-3 1.3-3 3v5c0 11.1 8.3 20.3 19 21.8V74h-5c-1.7 0-3 1.3-3 3s1.3 3 3 3h16c1.7 0 3-1.3 3-3s-1.3-3-3-3h-5v-4.2C63.7 68.3 72 59.1 72 48v-5c0-1.7-1.3-3-3-3z" />
      <path d="M50 58c5.5 0 10-4.5 10-10V29.9c0-5.5-4.4-9.9-9.9-9.9h-.2c-5.5 0-9.9 4.4-9.9 9.9V48c0 5.5 4.5 10 10 10z" />
    </svg>
  ),
  sparkle: (
    <svg className="slds-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
    </svg>
  ),
  /** SLDS utility: notification (bell) – same family as help, user */
  bell: (
    <svg className="slds-icon slds-icon_utility" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M46 33h-.5c-1.9 0-3.5-1.6-3.5-3.5V18c0-9.1-7.6-16.4-16.8-16C16.6 2.4 10 9.8 10 18.5v11.1c0 1.9-1.6 3.4-3.5 3.4H6c-2.2 0-4 1.9-4 4.1v1.5c0 .7.7 1.4 1.5 1.4h45c.8 0 1.5-.7 1.5-1.5V37c0-2.2-1.8-4-4-4zM30.9 44h-9.8c-.6 0-1.1.6-1 1.2.5 2.8 3 4.8 5.9 4.8s5.4-2.1 5.9-4.8c.1-.6-.4-1.2-1-1.2z" />
    </svg>
  ),
  /** SLDS utility: help */
  help: (
    <svg className="slds-icon slds-icon_utility" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M28.4 38h-5c-.8 0-1.4-.6-1.4-1.4v-1.5c0-4.2 2.7-8 6.7-9.4 1.2-.4 2.3-1.1 3.2-2.1 5-6 .4-13.2-5.6-13.4-2.2-.1-4.3.7-5.9 2.2-1.3 1.2-2.1 2.7-2.3 4.4-.1.6-.7 1.1-1.5 1.1h-5c-.9 0-1.6-.7-1.5-1.6.4-3.8 2.1-7.2 4.8-9.9 3.2-3 7.3-4.6 11.7-4.5C34.9 2.2 41.7 9 42 17.3c.3 7-4 13.3-10.5 15.7-.9.4-1.5 1.1-1.5 2v1.5c0 .9-.8 1.5-1.6 1.5zM30 48.5c0 .8-.7 1.5-1.5 1.5h-5c-.8 0-1.5-.7-1.5-1.5v-5c0-.8.7-1.5 1.5-1.5h5c.8 0 1.5.7 1.5 1.5v5z" />
    </svg>
  ),
  /** SLDS utility: user (profile) – for general use */
  user: (
    <svg className="slds-icon slds-icon_utility" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M50 43v2.2c0 2.6-2.2 4.8-4.8 4.8H6.8C4.2 50 2 47.8 2 45.2V43c0-5.8 6.8-9.4 13.2-12.2l.6-.3c.5-.2 1-.2 1.5.1 2.6 1.7 5.5 2.6 8.6 2.6s6.1-1 8.6-2.6c.5-.3 1-.3 1.5-.1l.6.3C43.2 33.6 50 37.1 50 43zM26 2c6.6 0 11.9 5.9 11.9 13.2S32.6 28.4 26 28.4s-11.9-5.9-11.9-13.2S19.4 2 26 2z" />
    </svg>
  ),
  /** SLDS action category: user (profile) – from action sprite */
  userAction: (
    <svg className="slds-icon slds-icon_action" viewBox="0 0 52 52" aria-hidden="true">
      <path d="M50 43v2.2c0 2.6-2.2 4.8-4.8 4.8H6.8C4.2 50 2 47.8 2 45.2V43c0-5.8 6.8-9.4 13.2-12.2l.6-.3c.5-.2 1-.2 1.5.1 2.6 1.7 5.5 2.6 8.6 2.6s6.1-1 8.6-2.6c.5-.3 1-.3 1.5-.1l.6.3C43.2 33.6 50 37.1 50 43zM26 2c6.6 0 11.9 5.9 11.9 13.2S32.6 28.4 26 28.4s-11.9-5.9-11.9-13.2S19.4 2 26 2z" />
    </svg>
  ),
  /** Spotify logo – green circle with three curved sound-wave bars */
  spotifyLogo: (
    <svg className="import-service-logo" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <circle cx="12" cy="12" r="11.5" fill="#1DB954" />
      <path fill="none" stroke="#FFFFFF" strokeWidth="1.1" strokeLinecap="round" d="M7 9.2q2.5-1.2 5 0q2.5 1.2 5 0M7 12q2.5 1.2 5 0q2.5-1.2 5 0M7 14.8q2.5-1.2 5 0q2.5 1.2 5 0" />
    </svg>
  ),
  /** Netflix logo – red N only, no background (viewBox 18×24) */
  netflixLogo: (
    <svg className="import-service-logo import-service-logo--netflix" viewBox="0 0 18 24" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <path fill="#E50914" d="M0 0h4v24H0V0zM4 24L14 0h4v24h-4V0L4 24z" />
    </svg>
  ),
  /** YouTube logo – red rounded rect with play icon */
  youtubeLogo: (
    <svg className="import-service-logo" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
}
