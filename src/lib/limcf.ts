export type LIMCFTrackMetadata = Record<
  string,
  string | number | boolean | null | undefined
>;

export type LIMCFLeadPayload = {
  name: string;
  phone: string;
  email?: string;
  message: string;
  source?: string;
  metadata?: LIMCFTrackMetadata;
};

export const limcfConfig = {
  apiBaseUrl:
    process.env.NEXT_PUBLIC_LIMCF_API_BASE_URL ||
    "https://limcf-business-os.vercel.app",

  clientId:
    process.env.NEXT_PUBLIC_LIMCF_CLIENT_ID ||
    "514a85f2-341e-47aa-97ad-5187cae0ec9d",

  websiteId:
    process.env.NEXT_PUBLIC_LIMCF_WEBSITE_ID ||
    "4997815f-32d9-41d2-bfc8-518af610de47",

  businessName:
    process.env.NEXT_PUBLIC_LIMCF_BUSINESS_NAME ||
    "Sukses Jaya Mobilindo",

  websiteDomain:
    process.env.NEXT_PUBLIC_LIMCF_WEBSITE_DOMAIN ||
    "https://sukses-jaya-mobilindo-2.vercel.app",

  whatsappNumber:
    process.env.NEXT_PUBLIC_LIMCF_WHATSAPP_NUMBER ||
    "",

  businessCategory:
    process.env.NEXT_PUBLIC_LIMCF_BUSINESS_CATEGORY ||
    "Showroom Mobil",
};

export function isLIMCFReady() {
  return Boolean(
    limcfConfig.apiBaseUrl &&
      limcfConfig.clientId &&
      limcfConfig.websiteId
  );
}

export function normalizeWhatsAppNumber(phone?: string) {
  const raw = String(phone || limcfConfig.whatsappNumber || "").replace(
    /\D/g,
    ""
  );

  if (!raw) return "";

  if (raw.startsWith("62")) return raw;
  if (raw.startsWith("0")) return `62${raw.slice(1)}`;

  return raw;
}

export function createWhatsAppUrl(message?: string, phone?: string) {
  const cleanPhone = normalizeWhatsAppNumber(phone);

  const text = encodeURIComponent(
    message ||
      `Halo ${limcfConfig.businessName}, saya ingin bertanya tentang mobil yang tersedia.`
  );

  return `https://wa.me/${cleanPhone}?text=${text}`;
}

function getVisitorId() {
  if (typeof window === "undefined") return "";

  const key = "limcf_visitor_id";
  let visitorId = localStorage.getItem(key);

  if (!visitorId) {
    visitorId =
      "visitor_" +
      Math.random().toString(36).slice(2, 12) +
      "_" +
      Date.now().toString(36);

    localStorage.setItem(key, visitorId);
  }

  return visitorId;
}

function getDeviceType() {
  if (typeof window === "undefined") return "desktop";

  if (window.innerWidth <= 640) return "mobile";
  if (window.innerWidth <= 1024) return "tablet";

  return "desktop";
}

export async function trackLIMCFEvent(
  eventType: string,
  metadata: LIMCFTrackMetadata = {}
) {
  if (!isLIMCFReady()) {
    console.warn("[LIMCF] Missing clientId or websiteId.");

    return {
      success: false,
      message: "LIMCF config incomplete",
    };
  }

  if (typeof window === "undefined") {
    return {
      success: false,
      message: "Window unavailable",
    };
  }

  const payload = {
    client_id: limcfConfig.clientId,
    website_id: limcfConfig.websiteId,
    event_type: eventType,
    page_path: window.location.pathname || "/",
    page_title: document.title || limcfConfig.businessName,
    visitor_id: getVisitorId(),
    device_type: getDeviceType(),
    referrer: document.referrer || null,
    user_agent: navigator.userAgent || null,
    metadata: {
      business_name: limcfConfig.businessName,
      business_category: limcfConfig.businessCategory,
      website_domain: limcfConfig.websiteDomain,
      current_url: window.location.href,
      timestamp: new Date().toISOString(),
      ...metadata,
    },
  };

  try {
    const response = await fetch(`${limcfConfig.apiBaseUrl}/api/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => null);

    return {
      success: response.ok,
      status: response.status,
      result,
    };
  } catch (error) {
    console.error("[LIMCF] Track event error:", error);

    return {
      success: false,
      message: "Track event failed",
    };
  }
}

export async function submitLIMCFLead(payload: LIMCFLeadPayload) {
  if (!isLIMCFReady()) {
    console.warn("[LIMCF] Missing clientId or websiteId.");

    return {
      success: false,
      message: "LIMCF config incomplete",
    };
  }

  try {
    const response = await fetch(`${limcfConfig.apiBaseUrl}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        client_id: limcfConfig.clientId,
        website_id: limcfConfig.websiteId,
        name: payload.name,
        phone: payload.phone,
        email: payload.email || "",
        message: payload.message,
        source: payload.source || "website_form",
        status: "new",
        metadata: {
          business_name: limcfConfig.businessName,
          business_category: limcfConfig.businessCategory,
          website_domain: limcfConfig.websiteDomain,
          ...payload.metadata,
        },
      }),
    });

    const result = await response.json().catch(() => null);

    await trackLIMCFEvent("lead_submit", {
      source: payload.source || "website_form",
      has_name: Boolean(payload.name),
      has_phone: Boolean(payload.phone),
      has_email: Boolean(payload.email),
    });

    return {
      success: response.ok,
      status: response.status,
      result,
    };
  } catch (error) {
    console.error("[LIMCF] Submit lead error:", error);

    return {
      success: false,
      message: "Submit lead failed",
    };
  }
}

let pageViewTracked = false;

export async function trackLIMCFPageView() {
  if (pageViewTracked) return;

  pageViewTracked = true;

  return trackLIMCFEvent("page_view", {
    event_label: "Page View",
    title: typeof document !== "undefined" ? document.title : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    user_agent:
      typeof navigator !== "undefined" ? navigator.userAgent : "",
  });
}
