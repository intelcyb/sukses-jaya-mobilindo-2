import { Button } from "@/components/Button";
import type { Car } from "@/lib/cars";
import { formatRupiah, waLink } from "@/lib/showroom";

export function BookingForm({ car }: { car: Car }) {
  const msg = `Halo Sukses Jaya Mobilindo 2, saya ingin booking cek unit dan test drive ${car.name} ${car.year} harga ${formatRupiah(car.price)}.`;
  return (
    <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
      <h2 className="text-2xl font-black">Booking Test Drive</h2>
      <div className="mt-5 grid gap-3">
        <input className="field rounded-panel" placeholder="Nama lengkap" />
        <input className="field rounded-panel" placeholder="Nomor WhatsApp" />
        <div className="grid gap-3 sm:grid-cols-2">
          <input className="field rounded-panel" type="date" />
          <input className="field rounded-panel" type="time" />
        </div>
        <textarea className="field min-h-28 rounded-panel" placeholder="Pesan tambahan" />
        <Button href={waLink(msg)}>Booking Test Drive</Button>
      </div>
    </div>
  );
}
