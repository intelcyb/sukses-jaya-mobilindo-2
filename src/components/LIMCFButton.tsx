'use client'

import type { ReactNode } from 'react'
import {
  createWhatsAppUrl,
  limcfConfig,
  trackLIMCFEvent,
} from '@/lib/limcf'

type LIMCFButtonProps = {
  children: ReactNode
  className?: string
  message?: string
  phone?: string
  label?: string
  source?: string
  eventType?: string
  metadata?: Record<string, string | number | boolean | null | undefined>
}

export default function LIMCFButton({
  children,
  className = '',
  message,
  phone,
  label = 'whatsapp_button',
  source = 'website',
  eventType = 'whatsapp_click',
  metadata = {},
}: LIMCFButtonProps) {
  const href = createWhatsAppUrl(message, phone || limcfConfig.whatsappNumber)

  async function handleClick() {
    await trackLIMCFEvent(eventType, {
      label,
      source,
      phone: phone || limcfConfig.whatsappNumber,
      whatsapp_url: href,
      ...metadata,
    })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      data-limcf-track="whatsapp_click"
      data-limcf-label={label}
      className={className}
    >
      {children}
    </a>
  )
}
