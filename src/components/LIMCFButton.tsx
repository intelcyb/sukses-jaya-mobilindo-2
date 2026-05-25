"use client";

import type { ReactNode } from "react";
import {
  createWhatsAppUrl,
  limcfConfig,
  trackLIMCFEvent,
} from "@/lib/limcf";

type LIMCFButtonProps = {
  children: ReactNode;
  className?: string;
  message?: string;
  phone?: string;
  label?: string;
  source?: string;
  eventType?: string;
  metadata?: Record<string, string | number | boolean | null | undefined>;
  variant?: "primary" | "secondary" | "ghost" | "dark";
};

const variants = {
  primary: "bg-redbrand text-white hover:bg-reddeep",
  secondary:
    "border border-ink/15 bg-white text-ink hover:border-redbrand hover:text-redbrand",
  ghost: "text-ink hover:bg-ink/5",
  dark: "bg-ink text-white hover:bg-coal",
};

export default function LIMCFButton({
  children,
  className = "",
  message,
  phone,
  label = "whatsapp_button",
  source = "website",
  eventType = "whatsapp_click",
  metadata = {},
  variant = "primary",
}: LIMCFButtonProps) {
  const href = createWhatsAppUrl(message, phone || limcfConfig.whatsappNumber);

  const cls = `touch inline-flex items-center justify-center rounded-panel px-5 py-3 text-sm font-bold transition ${variants[variant]} ${className}`;

  async function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();

    await trackLIMCFEvent(eventType, {
      event_label: "WhatsApp Click",
      button_text: label,
      label,
      source,
      phone: phone || limcfConfig.whatsappNumber,
      whatsapp_url: href,
      target_url: href,
      ...metadata,
    });

    window.location.href = href;
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      data-limcf-track="whatsapp_click"
      data-limcf-label={label}
      className={cls}
    >
      {children}
    </a>
  );
}
