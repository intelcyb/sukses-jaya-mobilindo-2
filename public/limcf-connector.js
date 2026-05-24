(function () {
  const LIMCF_CONFIG = {
    apiBaseUrl: "https://limcf-business-os.vercel.app",
    clientId: "514a85f2-341e-47aa-97ad-5187cae0ec9d",
    websiteId: "4997815f-32d9-41d2-bfc8-518af610de47",
    businessName: "Sukses Jaya Mobilindo",
    debug: true,
  };

  function log(...args) {
    if (LIMCF_CONFIG.debug) {
      console.log("[LIMCF Connector]", ...args);
    }
  }

  function warn(...args) {
    if (LIMCF_CONFIG.debug) {
      console.warn("[LIMCF Connector]", ...args);
    }
  }

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

  function normalizeUrl(url) {
    if (!url) return "";

    try {
      return String(url).toLowerCase();
    } catch (error) {
      return "";
    }
  }

  function isWhatsAppUrl(url) {
    const lowerUrl = normalizeUrl(url);

    return (
      lowerUrl.includes("wa.me") ||
      lowerUrl.includes("whatsapp.com") ||
      lowerUrl.includes("api.whatsapp.com") ||
      lowerUrl.includes("web.whatsapp.com") ||
      lowerUrl.includes("send?phone=")
    );
  }

  function buildTrackPayload(eventType, metadata = {}) {
    return {
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
    };
  }

  function sendTrackWithBeacon(url, payload) {
    if (!navigator.sendBeacon) return false;

    try {
      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });

      return navigator.sendBeacon(url, blob);
    } catch (error) {
      warn("sendBeacon error:", error);
      return false;
    }
  }

  function sendTrackWithFetch(url, payload) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then(async (response) => {
        const text = await response.text().catch(() => "");

        if (!response.ok) {
          warn("Track API failed:", response.status, text);
          return false;
        }

        log("Track API success:", payload.event_type, text);
        return true;
      })
      .catch((error) => {
        warn("Track fetch error:", error);
        return false;
      });
  }

  function trackEvent(eventType, metadata = {}) {
    const payload = buildTrackPayload(eventType, metadata);
    const url = `${LIMCF_CONFIG.apiBaseUrl}/api/track`;

    log("Tracking event:", eventType, payload);

    const beaconSent = sendTrackWithBeacon(url, payload);

    if (beaconSent) {
      log("Event sent with sendBeacon:", eventType);
      return;
    }

    sendTrackWithFetch(url, payload);
  }

  async function trackEventAndWait(eventType, metadata = {}) {
    const payload = buildTrackPayload(eventType, metadata);
    const url = `${LIMCF_CONFIG.apiBaseUrl}/api/track`;

    log("Tracking event and waiting:", eventType, payload);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        keepalive: true,
      });

      const text = await response.text().catch(() => "");

      if (!response.ok) {
        warn("Track wait API failed:", response.status, text);
        return false;
      }

      log("Track wait API success:", eventType, text);
      return true;
    } catch (error) {
      warn("Track wait fetch error:", error);
      return false;
    }
  }

  async function submitLead(data = {}) {
    const payload = {
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
    };

    log("Submitting lead:", payload);

    try {
      const response = await fetch(`${LIMCF_CONFIG.apiBaseUrl}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const text = await response.text().catch(() => "");

      if (!response.ok) {
        warn("Lead API failed:", response.status, text);
        return false;
      }

      log("Lead API success:", text);
      return true;
    } catch (error) {
      warn("Lead submit error:", error);
      return false;
    }
  }

  function setupPageViewTracking() {
    trackEvent("page_view", {
      event_label: "Page View",
    });
  }

  function setupWhatsAppTracking() {
    document.addEventListener(
      "click",
      async function (event) {
        const target = event.target;
        const link = target && target.closest ? target.closest("a") : null;

        if (!link) return;

        const rawHref = link.getAttribute("href") || "";
        const finalHref = link.href || rawHref;

        if (!isWhatsAppUrl(rawHref) && !isWhatsAppUrl(finalHref)) return;

        log("WhatsApp link clicked:", {
          rawHref,
          finalHref,
          text: link.innerText,
        });

        const shouldOpenNewTab =
          link.getAttribute("target") === "_blank" ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey;

        trackEvent("whatsapp_click", {
          event_label: "WhatsApp Click",
          button_text: (link.innerText || "WhatsApp Button").trim(),
          target_url: finalHref,
          raw_href: rawHref,
        });

        /**
         * Untuk link WhatsApp, browser sering pindah terlalu cepat.
         * Jadi kita tahan sebentar khusus klik normal agar event sempat masuk.
         */
        if (!shouldOpenNewTab) {
          event.preventDefault();

          await trackEventAndWait("whatsapp_click_confirmed", {
            event_label: "WhatsApp Click Confirmed",
            button_text: (link.innerText || "WhatsApp Button").trim(),
            target_url: finalHref,
            raw_href: rawHref,
          });

          window.location.href = finalHref;
        }
      },
      true
    );

    log("WhatsApp tracking ready");
  }

  function setupPhoneTracking() {
    document.addEventListener(
      "click",
      function (event) {
        const target = event.target;
        const link = target && target.closest ? target.closest("a") : null;

        if (!link) return;

        const href = link.getAttribute("href") || "";

        if (!href.startsWith("tel:")) return;

        trackEvent("phone_click", {
          event_label: "Phone Click",
          button_text: (link.innerText || "Phone Button").trim(),
          target_url: link.href,
        });
      },
      true
    );

    log("Phone tracking ready");
  }

  function setupCustomEventTracking() {
    document.addEventListener(
      "click",
      function (event) {
        const target = event.target;
        const element =
          target && target.closest ? target.closest("[data-limcf-event]") : null;

        if (!element) return;

        const eventType = element.getAttribute("data-limcf-event");

        if (!eventType) return;

        trackEvent(eventType, {
          event_label:
            element.getAttribute("data-limcf-label") ||
            element.innerText ||
            "Custom Event",
          car_name: element.getAttribute("data-car-name") || null,
          car_price: element.getAttribute("data-car-price") || null,
          target_url: element.href || null,
        });
      },
      true
    );

    log("Custom event tracking ready");
  }

  function setupLeadForms() {
    document.addEventListener("submit", async function (event) {
      const form = event.target;

      if (!form || !form.matches || !form.matches("[data-limcf-lead-form]")) {
        return;
      }

      event.preventDefault();

      const submitButton = form.querySelector('[type="submit"]');
      const originalButtonText = submitButton ? submitButton.innerText : "";

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerText = "Mengirim...";
      }

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

      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerText = originalButtonText;
      }
    });

    log("Lead form tracking ready");
  }

  function initLIMCFConnector() {
    setupPageViewTracking();
    setupWhatsAppTracking();
    setupPhoneTracking();
    setupCustomEventTracking();
    setupLeadForms();

    window.LIMCF = {
      track: trackEvent,
      trackAndWait: trackEventAndWait,
      submitLead,
      config: LIMCF_CONFIG,
    };

    console.log("LIMCF Connector active: Sukses Jaya Mobilindo");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLIMCFConnector);
  } else {
    initLIMCFConnector();
  }
})();
