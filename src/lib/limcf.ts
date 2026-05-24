export type LIMCFTrackMetadata = Record<
  string,
  string | number | boolean | null | undefined
>

export type LIMCFLeadPayload = {
  name: string
  phone: string
  email?: string
  message: string
  source?: string
}

export const limcfConfig = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_LIMCF_API_BASE_URL ||
    'https://limcf-business-os.vercel.app',

  clientId: process.env.NEXT_PUBLIC_LIMCF_CLIENT_ID || '',
  websiteId: process.env.NEXT_PUBLIC_LIMCF_WEBSITE_ID || '',

  businessName: process.env.NEXT_PUBLIC_LIMCF_BUSINESS_NAME || '',
  websiteDomain: process.env.NEXT_PUBLIC_LIMCF_WEBSITE_DOMAIN || '',
  whatsappNumber: process.env.NEXT_PUBLIC_LIMCF_WHATSAPP_NUMBER || '',
  businessCategory: process.env.NEXT_PUBLIC_LIMCF_BUSINESS_CATEGORY || '',
}

export function isLIMCFReady() {
  return Boolean(
    limcfConfig.apiBaseUrl &&
      limcfConfig.clientId &&
      limcfConfig.websiteId
  )
}

export function normalizeWhatsAppNumber(phone?: string) {
  const raw = String(phone || limcfConfig.whatsappNumber || '').replace(/\D/g, '')

  if (!raw) return ''

  if (raw.startsWith('62')) return raw
  if (raw.startsWith('0')) return `62${raw.slice(1)}`

  return raw
}

export function createWhatsAppUrl(message?: string, phone?: string) {
  const cleanPhone = normalizeWhatsAppNumber(phone)

  const text = encodeURIComponent(
    message ||
      `Halo ${limcfConfig.businessName}, saya ingin bertanya tentang mobil yang tersedia.`
  )

  return `https://wa.me/${cleanPhone}?text=${text}`
}

export async function trackLIMCFEvent(
  eventType: string,
  metadata: LIMCFTrackMetadata = {}
) {
  if (!isLIMCFReady()) {
    console.warn('[LIMCF] Missing clientId or websiteId.')

    return {
      success: false,
      message: 'LIMCF config incomplete',
    }
  }

  try {
    const response = await fetch(`${limcfConfig.apiBaseUrl}/api/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        client_id: limcfConfig.clientId,
        website_id: limcfConfig.websiteId,
        event_type: eventType,

        page:
          typeof window !== 'undefined'
            ? window.location.pathname
            : '/',

        metadata: {
          business_name: limcfConfig.businessName,
          business_category: limcfConfig.businessCategory,
          website_domain: limcfConfig.websiteDomain,

          url:
            typeof window !== 'undefined'
              ? window.location.href
              : limcfConfig.websiteDomain,

          timestamp: new Date().toISOString(),

          ...metadata,
        },
      }),
    })

    return await response.json()
  } catch (error) {
    console.error('[LIMCF] Track event error:', error)

    return {
      success: false,
      message: 'Track event failed',
    }
  }
}

export async function submitLIMCFLead(payload: LIMCFLeadPayload) {
  if (!isLIMCFReady()) {
    console.warn('[LIMCF] Missing clientId or websiteId.')

    return {
      success: false,
      message: 'LIMCF config incomplete',
    }
  }

  try {
    const response = await fetch(`${limcfConfig.apiBaseUrl}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        client_id: limcfConfig.clientId,
        website_id: limcfConfig.websiteId,
        name: payload.name,
        phone: payload.phone,
        email: payload.email || '',
        message: payload.message,
        source: payload.source || 'website_form',
      }),
    })

    const result = await response.json()

    await trackLIMCFEvent('form_submit', {
      source: payload.source || 'website_form',
      has_name: Boolean(payload.name),
      has_phone: Boolean(payload.phone),
      has_email: Boolean(payload.email),
    })

    return result
  } catch (error) {
    console.error('[LIMCF] Submit lead error:', error)

    return {
      success: false,
      message: 'Submit lead failed',
    }
  }
}

let pageViewTracked = false

export async function trackLIMCFPageView() {
  if (pageViewTracked) return

  pageViewTracked = true

  return trackLIMCFEvent('page_view', {
    title: typeof document !== 'undefined' ? document.title : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    user_agent:
      typeof navigator !== 'undefined' ? navigator.userAgent : '',
  })
}
