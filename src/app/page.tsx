import Image from "next/image";
import { CalendarCheck, CheckCircle2, MapPin, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { CarCard } from "@/components/CarCard";
import { PublicShell } from "@/components/PublicShell";
import { QuickSearch } from "@/components/QuickSearch";
import { SectionHeader } from "@/components/SectionHeader";
import { bodyTypes, featuredCars } from "@/lib/cars";
import { formatRupiah, showroom, waLink } from "@/lib/showroom";

const trust = ["Rating 5.0", "602+ Ulasan", "Cash & Kredit", "Tukar Tambah", "Lokasi Strategis"];
const reasons = [
  "Unit berkualitas dan siap pakai",
  "Pilihan cash, kredit, dan tukar tambah",
  "Lokasi strategis di Jl. Soekarno-Hatta",
  "Tim ramah dan responsif",
  "Foto dan informasi unit transparan",
  "Konsultasi pembelian yang mudah"
];
const reviews = [
  "Untuk pelayanan di showroom bagus, kualitas bagus, unit juga tidak mengecewakan.",
  "Rekom banget untuk bapak/ibu cari mobil bekas berkualitas.",
  "Bagus, lokasi di tepi jalan besar, mudah ditemukan, pegawai ramah."
];

export default function HomePage() {
  return (
    <PublicShell>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image src={featuredCars[0].images[0].url} alt="Mobil premium di showroom" fill priority sizes="100vw" className="object-cover opacity-35 md:opacity-45" />
          <div className="absolute inset-0 bg-ink/72 md:bg-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/92 via-ink/82 to-ink md:bg-gradient-to-r md:from-ink md:via-ink/86 md:to-ink/28" />
        </div>
        <div className="container-pad relative z-10 grid min-h-[calc(100svh-80px)] items-center gap-10 py-10 pb-24 md:py-16 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-gold backdrop-blur sm:px-4 sm:text-xs sm:tracking-[0.18em]">
              <Star size={14} /> {showroom.rating} dari {showroom.reviews} ulasan Google
            </p>
            <h1 className="display-title mt-6 max-w-4xl font-black">Showroom Mobil Berkualitas di Pekanbaru</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 md:text-lg md:leading-8">
              Temukan mobil baru dan bekas berkualitas dengan pilihan cash, kredit, tukar tambah, dan konsultasi langsung bersama tim Sukses Jaya Mobilindo 2.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button href="/katalog">Lihat Katalog Mobil</Button>
              <Button href={waLink("Halo Sukses Jaya Mobilindo 2, saya ingin konsultasi pilihan mobil.")} variant="secondary">
                Konsultasi via WhatsApp
              </Button>
            </div>
            <div className="mt-7 hidden flex-wrap gap-2 sm:flex">
              {trust.map((item) => (
                <span key={item} className="rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm font-bold text-white/82 backdrop-blur">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="panel rounded-panel bg-white/10 p-4">
              <Image src={featuredCars[11 % featuredCars.length].images[0].url} alt="Pilihan mobil premium" width={700} height={520} className="aspect-[4/3] rounded-panel object-cover" />
              <div className="grid grid-cols-3 gap-3 pt-4 text-center">
                <div><b className="text-2xl">12+</b><p className="text-xs text-white/64">Unit Pilihan</p></div>
                <div><b className="text-2xl">5.0</b><p className="text-xs text-white/64">Rating</p></div>
                <div><b className="text-2xl">18.00</b><p className="text-xs text-white/64">Buka Hingga</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <QuickSearch />

      <section className="section-y container-pad">
        <SectionHeader eyebrow="Featured Cars" title="Unit pilihan yang siap Anda cek hari ini" body="Kurasi mobil populer dengan informasi jelas, foto representatif, dan akses konsultasi cepat." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredCars.slice(0, 6).map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-pad">
          <SectionHeader eyebrow="Kategori" title="Cari berdasarkan kebutuhan berkendara" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {bodyTypes.map((type) => (
              <a href={`/katalog?bodyType=${type}`} key={type} className="rounded-panel border border-ink/10 bg-pearl p-5 text-center font-black transition hover:border-redbrand hover:bg-white hover:text-redbrand">
                {type}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y container-pad grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-redbrand">Kenapa Kami</p>
          <h2 className="mt-3 text-4xl font-black leading-tight md:text-5xl">Pengalaman beli mobil yang terasa tenang sejak awal.</h2>
          <p className="mt-5 leading-7 text-coal/68">Kami membantu pelanggan memilih unit sesuai kebutuhan, anggaran, dan rencana pembiayaan dengan pendekatan yang rapi dan transparan.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {reasons.map((reason) => (
            <div key={reason} className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft">
              <CheckCircle2 className="text-redbrand" />
              <p className="mt-4 font-bold">{reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="container-pad grid gap-8 lg:grid-cols-2">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Simulasi Kredit</p>
            <h2 className="mt-3 text-4xl font-black">Estimasi cicilan sebelum datang ke showroom.</h2>
            <p className="mt-4 text-white/68">Contoh unit mulai {formatRupiah(186000000)}, DP 25%, tenor hingga 60 bulan. Angka final mengikuti ketentuan leasing.</p>
          </div>
          <div className="rounded-panel border border-white/10 bg-white/8 p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div><p className="text-xs text-white/55">Harga mulai</p><b className="text-xl">{formatRupiah(186000000)}</b></div>
              <div><p className="text-xs text-white/55">Contoh DP</p><b className="text-xl">25%</b></div>
              <div><p className="text-xs text-white/55">Tenor</p><b className="text-xl">60 bulan</b></div>
            </div>
            <Button href="/simulasi-kredit" className="mt-6">Coba Simulasi Kredit</Button>
          </div>
        </div>
      </section>

      <section className="section-y container-pad">
        <div className="rounded-panel bg-white p-8 shadow-premium md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <CalendarCheck className="text-redbrand" size={34} />
              <h2 className="mt-4 text-4xl font-black">Booking Cek Unit & Test Drive</h2>
              <p className="mt-4 leading-7 text-coal/68">Atur jadwal kunjungan supaya tim kami bisa menyiapkan unit, dokumen, dan sesi konsultasi sesuai mobil incaran Anda.</p>
            </div>
            <div className="flex items-center lg:justify-end">
              <Button href="/kontak">Jadwalkan Kunjungan</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-pad">
          <SectionHeader eyebrow="Testimoni" title="Dipercaya pelanggan Pekanbaru" />
          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((review) => (
              <blockquote key={review} className="rounded-panel border border-ink/10 bg-pearl p-6">
                <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                <p className="mt-5 leading-7 text-coal/78">“{review}”</p>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y container-pad">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <MapPin className="text-redbrand" />
            <h2 className="mt-4 text-4xl font-black">Datang langsung ke showroom.</h2>
            <p className="mt-4 leading-7 text-coal/68">{showroom.address}</p>
            <p className="mt-3 font-bold">{showroom.openInfo}</p>
            <Button href={waLink("Halo, saya ingin minta arahan lokasi showroom Sukses Jaya Mobilindo 2.")} className="mt-6">Hubungi WhatsApp</Button>
          </div>
          <div className="grid min-h-[320px] place-items-center rounded-panel border border-ink/10 bg-white subtle-grid text-center shadow-soft">
            <div><MapPin className="mx-auto text-redbrand" /><p className="mt-3 font-bold">Google Maps Placeholder</p><p className="text-sm text-coal/58">{showroom.shortAddress}</p></div>
          </div>
        </div>
      </section>

      <section className="bg-redbrand py-14 text-white">
        <div className="container-pad flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
          <h2 className="max-w-2xl text-3xl font-black md:text-5xl">Siap menemukan mobil pilihan Anda?</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/katalog" variant="secondary">Lihat Katalog</Button>
            <Button href={waLink("Halo Sukses Jaya Mobilindo 2, saya ingin mencari mobil pilihan.")} variant="dark">Hubungi WhatsApp</Button>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
