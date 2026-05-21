import Image from "next/image";
import { showroom } from "@/lib/showroom";

export function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full border border-white/40 bg-white shadow-soft">
        <Image
          src="/images/logo.png"
          alt={`${showroom.name} logo`}
          width={56}
          height={56}
          className="h-full w-full object-contain p-1"
          priority
        />
      </div>

      {!compact && (
        <div className="leading-tight">
          <p className="text-sm font-black uppercase tracking-[0.08em] text-ink md:text-base">
            {showroom.name}
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-coal/60 md:text-xs">
            Premium Auto Showroom Pekanbaru
          </p>
        </div>
      )}
    </div>
  );
}