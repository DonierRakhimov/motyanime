import React from 'react'
import s from './popup.module.css'
import classNames from 'classnames'

export default function Popup({ isOpen, children }) {
  return (
    <div className={classNames(s.overlay, isOpen ? s.overlayOpen : '')}>
      <div className={classNames(s.modal, isOpen ? s.modalOpen : '')}>
        {children}
      </div>
    </div>
  )
}
