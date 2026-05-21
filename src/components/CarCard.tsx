import Image from "next/image";
import { Gauge, Fuel, Settings } from "lucide-react";
import { Button } from "@/components/Button";
import type { Car } from "@/lib/cars";
import { formatKm, formatRupiah, waLink } from "@/lib/showroom";

const statusClass = {
  Available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Booked: "bg-amber-50 text-amber-700 border-amber-200",
  Sold: "bg-zinc-100 text-zinc-500 border-zinc-200"
};

export function StatusBadge({ status }: { status: Car["status"] }) {
  const label = status === "Available" ? "Tersedia" : status === "Booked" ? "Booked" : "Terjual";
  return <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusClass[status]}`}>{label}</span>;
}

export function CarCard({ car }: { car: Car }) {
  const message = `Halo Sukses Jaya Mobilindo 2, saya tertarik dengan ${car.name} ${car.year} harga ${formatRupiah(car.price)}. Apakah unit ini masih tersedia?`;
  return (
    <article className="group overflow-hidden rounded-panel border border-ink/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-premium">
      <div className="relative aspect-[4/3] overflow-hidden bg-coal">
        <Image src={car.images[0].url} alt={car.images[0].alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <StatusBadge status={car.status} />
          {car.isFeatured && <span className="rounded-full border border-gold/40 bg-ink/80 px-3 py-1 text-xs font-bold text-gold backdrop-blur">Featured</span>}
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-redbrand">{car.brand} {car.model}</p>
            <h3 className="mt-1 text-lg font-black text-ink">{car.name}</h3>
          </div>
          <span className="rounded-full bg-pearl px-3 py-1 text-sm font-black">{car.year}</span>
        </div>
        <p className="mt-4 text-2xl font-black text-ink">{formatRupiah(car.price)}</p>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-semibold text-coal/65">
          <span className="flex items-center gap-1"><Gauge size={14} />{formatKm(car.mileage)}</span>
          <span className="flex items-center gap-1"><Settings size={14} />{car.transmission}</span>
          <span className="flex items-center gap-1"><Fuel size={14} />{car.fuelType}</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Button href={`/mobil/${car.slug}`} variant="secondary" className="px-3">Lihat Detail</Button>
          <Button href={waLink(message)} className="px-3">Tanya via WhatsApp</Button>
        </div>
      </div>
    </article>
  );
}
