"use client";

import Image from "next/image";
import { useState } from "react";
import type { CarImage } from "@/lib/cars";

export function CarGallery({ images }: { images: CarImage[] }) {
  const [active, setActive] = useState(images[0]);
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-coal shadow-premium">
        <Image src={active.url} alt={active.alt} fill priority sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-ink/78 px-3 py-1 text-xs font-bold text-white backdrop-blur">{active.category}</span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {images.map((image) => (
          <button
            key={`${image.category}-${image.url}`}
            onClick={() => setActive(image)}
            className={`relative aspect-[4/3] overflow-hidden rounded-panel border-2 ${active.url === image.url ? "border-redbrand" : "border-transparent"}`}
            aria-label={`Lihat foto ${image.category}`}
          >
            <Image src={image.url} alt={image.alt} fill sizes="16vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
