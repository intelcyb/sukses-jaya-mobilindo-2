(function () {
  const LIMCF_CONFIG = {
    apiBaseUrl: "https://limcf-business-os.vercel.app",
    clientId: "514a85f2-341e-47aa-97ad-5187cae0ec9d",
    websiteId: "4997815f-32d9-41d2-bfc8-518af610de47",
    businessName: "Sukses Jaya Mobilindo",
  };

  function getVisitorId() {
    const key = "limcf_visitor_id";
    let visitorId = localStorage.getItem(key);

    if (!visitorId) {
      visitorId =
        "visitor_" +
        Math.random().toString(36).substring(2, 12) +
        "_" +
        Date.now().toString(36);

      localStorage.setItem(key, visitorId);
    }

    return visitorId;
  }

  function getDeviceType() {
    const width = window.innerWidth;

    if (width <= 640) return "mobile";
    if (width <= 1024) return "tablet";

    return "desktop";
  }

  async function trackEvent(eventType, metadata = {}) {
    try {
      await fetch(`${LIMCF_CONFIG.apiBaseUrl}/api/track`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website_id: LIMCF_CONFIG.websiteId,
          client_id: LIMCF_CONFIG.clientId,
          event_type: eventType,
          page_path: window.location.pathname || "/",
          page_title: document.title || LIMCF_CONFIG.businessName,
          visitor_id: getVisitorId(),
          device_type: getDeviceType(),
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
          metadata: {
            business_name: LIMCF_CONFIG.businessName,
            current_url: window.location.href,
            timestamp: new Date().toISOString(),
            ...metadata,
          },
        }),
      });
    } catch (error) {
      console.warn("LIMCF track error:", error);
    }
  }

  async function submitLead(data = {}) {
    try {
      const response = await fetch(`${LIMCF_CONFIG.apiBaseUrl}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          website_id: LIMCF_CONFIG.websiteId,
          client_id: LIMCF_CONFIG.clientId,
          name: data.name || "",
          phone: data.phone || "",
          email: data.email || "",
          message: data.message || "",
          source: data.source || "Website Sukses Jaya Mobilindo",
          status: "new",
          metadata: {
            business_name: LIMCF_CONFIG.businessName,
            page_path: window.location.pathname || "/",
            page_title: document.title || LIMCF_CONFIG.businessName,
            current_url: window.location.href,
            visitor_id: getVisitorId(),
            device_type: getDeviceType(),
            timestamp: new Date().toISOString(),
            ...data.metadata,
          },
        }),
      });

      return response.ok;
    } catch (error) {
      console.warn("LIMCF lead error:", error);
      return false;
    }
  }

  function setupPageViewTracking() {
    trackEvent("page_view", {
      event_label: "Page View",
    });
  }

  function setupWhatsAppTracking() {
    const whatsappLinks = document.querySelectorAll(
      'a[href*="wa.me"], a[href*="whatsapp"], a[href*="api.whatsapp.com"]'
    );

    whatsappLinks.forEach((link) => {
      link.addEventListener("click", function () {
        trackEvent("whatsapp_click", {
          event_label: "WhatsApp Click",
          button_text: link.innerText || "WhatsApp Button",
          target_url: link.href,
        });
      });
    });
  }

  function setupPhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    phoneLinks.forEach((link) => {
      link.addEventListener("click", function () {
        trackEvent("phone_click", {
          event_label: "Phone Click",
          button_text: link.innerText || "Phone Button",
          target_url: link.href,
        });
      });
    });
  }

  function setupLeadForms() {
    const forms = document.querySelectorAll("[data-limcf-lead-form]");

    forms.forEach((form) => {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        const leadData = {
          name:
            formData.get("name") ||
            formData.get("nama") ||
            formData.get("full_name") ||
            "",
          phone:
            formData.get("phone") ||
            formData.get("telepon") ||
            formData.get("whatsapp") ||
            formData.get("wa") ||
            "",
          email: formData.get("email") || "",
          message:
            formData.get("message") ||
            formData.get("pesan") ||
            formData.get("kebutuhan") ||
            "",
          source:
            form.getAttribute("data-limcf-source") ||
            "Form Website Sukses Jaya Mobilindo",
          metadata: {
            form_id: form.id || null,
            form_name: form.getAttribute("name") || null,
          },
        };

        const success = await submitLead(leadData);

        if (success) {
          trackEvent("lead_submit", {
            event_label: "Lead Form Submit",
            lead_name: leadData.name,
            lead_phone: leadData.phone,
            source: leadData.source,
          });

          form.reset();

          alert(
            "Terima kasih. Data Anda sudah terkirim. Tim Sukses Jaya Mobilindo akan segera menghubungi Anda."
          );
        } else {
          alert(
            "Maaf, data belum berhasil terkirim. Silakan hubungi kami melalui WhatsApp."
          );
        }
      });
    });
  }

  function setupCustomEvents() {
    const elements = document.querySelectorAll("[data-limcf-event]");

    elements.forEach((element) => {
      element.addEventListener("click", function () {
        trackEvent(element.getAttribute("data-limcf-event"), {
          event_label:
            element.getAttribute("data-limcf-label") ||
            element.innerText ||
            "Custom Event",
          car_name: element.getAttribute("data-car-name") || null,
          car_price: element.getAttribute("data-car-price") || null,
          target_url: element.href || null,
        });
      });
    });
  }

  function init() {
    setupPageViewTracking();
    setupWhatsAppTracking();
    setupPhoneTracking();
    setupLeadForms();
    setupCustomEvents();

    window.LIMCF = {
      track: trackEvent,
      submitLead,
      config: LIMCF_CONFIG,
    };

    console.log("LIMCF Connector active:", LIMCF_CONFIG.businessName);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
