import type { Metadata } from "next";
import "./globals.css";
import { showroom } from "@/lib/showroom";

export const metadata: Metadata = {
  metadataBase: new URL("https://suksesjayamobilindo2.example"),
  title: {
    default: "Sukses Jaya Mobilindo 2 | Showroom Mobil Berkualitas Pekanbaru",
    template: "%s | Sukses Jaya Mobilindo 2"
  },
  description:
    "Showroom mobil baru dan bekas berkualitas di Pekanbaru. Tersedia pembelian cash, kredit, tukar tambah, konsultasi unit, dan booking test drive.",
  openGraph: {
    title: "Sukses Jaya Mobilindo 2",
    description:
      "Premium car showroom di Jl. Soekarno-Hatta Pekanbaru dengan rating 5.0 dari 602 ulasan.",
    type: "website",
    locale: "id_ID"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoDealer",
    name: showroom.name,
    address: showroom.address,
    telephone: showroom.phone,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "602"
    },
    openingHours: "Mo-Su 09:00-18:00",
    areaServed: "Pekanbaru, Riau"
  };

  return (
    <html lang="id">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
