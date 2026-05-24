"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";

type Props = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  className?: string;
};

declare global {
  interface Window {
    LIMCF?: {
      track?: (eventType: string, metadata?: Record<string, unknown>) => void;
      trackAndWait?: (
        eventType: string,
        metadata?: Record<string, unknown>
      ) => Promise<boolean>;
      config?: Record<string, unknown>;
    };
  }
}

const variants = {
  primary: "bg-redbrand text-white hover:bg-reddeep",
  secondary:
    "border border-ink/15 bg-white text-ink hover:border-redbrand hover:text-redbrand",
  ghost: "text-ink hover:bg-ink/5",
  dark: "bg-ink text-white hover:bg-coal",
};

function isExternalHref(href: string) {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

function isWhatsAppHref(href: string) {
  const value = href.toLowerCase();

  return (
    value.includes("wa.me") ||
    value.includes("whatsapp.com") ||
    value.includes("api.whatsapp.com") ||
    value.includes("web.whatsapp.com") ||
    value.includes("send?phone=")
  );
}

function getButtonText(children: ReactNode) {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);

  return "Button";
}

async function trackWhatsAppClick({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const metadata = {
    event_label: "WhatsApp Click",
    button_text: label,
    target_url: href,
    source: "Button.tsx",
  };

  try {
    if (window.LIMCF?.trackAndWait) {
      await window.LIMCF.trackAndWait("whatsapp_click", metadata);
      return;
    }

    if (window.LIMCF?.track) {
      window.LIMCF.track("whatsapp_click", metadata);
      return;
    }

    await fetch("https://limcf-business-os.vercel.app/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      keepalive: true,
      body: JSON.stringify({
        website_id: "4997815f-32d9-41d2-bfc8-518af610de47",
        client_id: "514a85f2-341e-47aa-97ad-5187cae0ec9d",
        event_type: "whatsapp_click",
        page_path: window.location.pathname || "/",
        page_title: document.title || "Sukses Jaya Mobilindo",
        visitor_id:
          localStorage.getItem("limcf_visitor_id") ||
          `visitor_${Date.now()}`,
        device_type:
          window.innerWidth <= 640
            ? "mobile"
            : window.innerWidth <= 1024
              ? "tablet"
              : "desktop",
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null,
        metadata,
      }),
    });
  } catch (error) {
    console.warn("LIMCF WhatsApp tracking error:", error);
  }
}

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  const cls = `touch inline-flex items-center justify-center rounded-panel px-5 py-3 text-sm font-bold transition ${variants[variant]} ${className}`;

  async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!href) return;
    if (!isWhatsAppHref(href)) return;

    const shouldOpenNewTab =
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.currentTarget.target === "_blank";

    if (shouldOpenNewTab) {
      window.LIMCF?.track?.("whatsapp_click", {
        event_label: "WhatsApp Click",
        button_text: getButtonText(children),
        target_url: href,
        source: "Button.tsx new tab",
      });

      return;
    }

    event.preventDefault();

    await trackWhatsAppClick({
      href,
      label: getButtonText(children),
    });

    window.location.href = href;
  }

  if (href) {
    if (isExternalHref(href)) {
      return (
        <a href={href} className={cls} onClick={handleClick}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return <button className={cls}>{children}</button>;
}
