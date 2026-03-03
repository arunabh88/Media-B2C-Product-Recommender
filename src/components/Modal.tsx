import { Fragment, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icons } from './Icons'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <Fragment>
          <motion.div
            className="slds-backdrop slds-backdrop_open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <section
            role="dialog"
            tabIndex={-1}
            aria-modal="true"
            aria-labelledby="modal-title"
            className="slds-modal slds-fade-in-open slds-modal_medium"
          >
            <motion.div
              className="slds-modal__container"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <header className="slds-modal__header">
                <button
                  type="button"
                  className="slds-button slds-button_icon slds-modal__close slds-button_icon-inverse"
                  title="Close"
                  onClick={onClose}
                >
                  <span className="slds-button__icon slds-button__icon_left" aria-hidden="true">
                    {Icons.close}
                  </span>
                  <span className="slds-assistive-text">Close</span>
                </button>
                <h2 id="modal-title" className="slds-modal__title slds-hyphenate">
                  {title}
                </h2>
              </header>
              <div className="slds-modal__content slds-p-around_medium">{children}</div>
            </motion.div>
          </section>
        </Fragment>
      )}
    </AnimatePresence>
  )
}
