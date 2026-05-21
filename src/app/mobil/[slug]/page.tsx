import { notFound } from "next/navigation";
import { BadgeCheck, CarFront, FileCheck, Fuel, Gauge, Palette, Repeat2, Settings } from "lucide-react";
import { BookingForm } from "@/components/BookingForm";
import { Button } from "@/components/Button";
import { CarCard, StatusBadge } from "@/components/CarCard";
import { CarGallery } from "@/components/CarGallery";
import { PublicShell } from "@/components/PublicShell";
import { cars, getCarBySlug, getRelatedCars } from "@/lib/cars";
import { formatKm, formatRupiah, waLink } from "@/lib/showroom";

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const car = getCarBySlug(params.slug);
  return {
    title: car ? `${car.name} ${car.year}` : "Detail Mobil",
    description: car?.description
  };
}

export default function CarDetailPage({ params }: { params: { slug: string } }) {
  const car = getCarBySlug(params.slug);
  if (!car) notFound();

  const askMsg = `Halo Sukses Jaya Mobilindo 2, saya tertarik dengan ${car.name} ${car.year} harga ${formatRupiah(car.price)}. Apakah unit ini masih tersedia?`;
  const creditMsg = `Halo Sukses Jaya Mobilindo 2, saya ingin tanya simulasi kredit untuk ${car.name} ${car.year} harga ${formatRupiah(car.price)}.`;
  const tradeMsg = `Halo Sukses Jaya Mobilindo 2, saya ingin ajukan tukar tambah untuk ${car.name} ${car.year}.`;
  const related = getRelatedCars(car);
  const specs = [
    ["Brand", car.brand, CarFront],
    ["Model", car.model, BadgeCheck],
    ["Varian", car.variant, BadgeCheck],
    ["Tahun", String(car.year), BadgeCheck],
    ["Kilometer", formatKm(car.mileage), Gauge],
    ["Transmisi", car.transmission, Settings],
    ["Bahan bakar", car.fuelType, Fuel],
    ["Warna", car.color, Palette],
    ["Body type", car.bodyType, CarFront],
    ["Plat", car.specs.plateArea, FileCheck],
    ["Pajak", car.specs.taxStatus, FileCheck],
    ["Dokumen", car.specs.documentStatus, FileCheck]
  ] as const;

  return (
    <PublicShell>
      <section className="container-pad grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr]">
        <CarGallery images={car.images} />
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-premium">
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={car.status} />
              {car.isFeatured && <span className="rounded-full border border-gold/40 bg-ink px-3 py-1 text-xs font-bold text-gold">Featured</span>}
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight">{car.name} {car.year}</h1>
            <p className="mt-3 text-coal/68">{car.description}</p>
            <p className="mt-6 text-4xl font-black text-redbrand">{formatRupiah(car.price)}</p>
            <div className="mt-6 grid gap-2">
              <Button href={waLink(askMsg)}>Tanya Unit Ini</Button>
              <Button href={waLink(`Halo, saya ingin booking cek unit ${car.name} ${car.year}.`)} variant="secondary">Booking Cek Unit</Button>
              <Button href={waLink(creditMsg)} variant="secondary">Tanya Simulasi Kredit</Button>
              <Button href={waLink(tradeMsg)} variant="secondary">Ajukan Tukar Tambah</Button>
            </div>
          </div>
        </aside>
      </section>

      <section className="container-pad grid gap-6 pb-14 lg:grid-cols-[1fr_0.72fr]">
        <div className="grid gap-6">
          <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black">Spesifikasi Utama</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {specs.map(([label, value, Icon]) => (
                <div key={label} className="flex items-center gap-3 rounded-panel bg-pearl p-4">
                  <Icon size={18} className="text-redbrand" />
                  <div><p className="text-xs font-bold uppercase tracking-[0.12em] text-coal/48">{label}</p><p className="font-black">{value}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black">Deskripsi</h2>
            <p className="mt-4 leading-8 text-coal/72">{car.description} Unit ini disiapkan untuk pelanggan yang menginginkan mobil dengan kondisi jelas, tampilan terawat, dan proses konsultasi yang nyaman. Silakan jadwalkan kunjungan untuk pengecekan langsung, test drive, serta pembahasan opsi pembayaran cash atau kredit.</p>
          </div>
          <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black">Tukar Tambah</h2>
            <p className="mt-4 leading-7 text-coal/68">Punya mobil lama? Tim kami dapat membantu konsultasi estimasi tukar tambah sehingga proses upgrade mobil menjadi lebih praktis.</p>
            <Button href={waLink(tradeMsg)} variant="dark" className="mt-5">Konsultasi Tukar Tambah</Button>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="rounded-panel bg-ink p-6 text-white shadow-premium">
            <h2 className="text-2xl font-black">Preview Pembiayaan</h2>
            <div className="mt-5 grid gap-3 text-sm">
              <div className="flex justify-between border-b border-white/10 pb-3"><span>Harga</span><b>{formatRupiah(car.price)}</b></div>
              <div className="flex justify-between border-b border-white/10 pb-3"><span>Contoh DP 25%</span><b>{formatRupiah(car.price * 0.25)}</b></div>
              <div className="flex justify-between border-b border-white/10 pb-3"><span>Tenor</span><b>48 bulan</b></div>
              <div className="flex justify-between"><span>Estimasi cicilan</span><b>{formatRupiah((car.price * 0.8) / 48)}</b></div>
            </div>
            <Button href={waLink(creditMsg)} className="mt-6 w-full">Tanya Simulasi Kredit</Button>
          </div>
          <BookingForm car={car} />
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-pad">
          <h2 className="text-3xl font-black">Unit Terkait</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((item) => <CarCard key={item.id} car={item} />)}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
