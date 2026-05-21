import { Award, MapPin, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/Button";
import { PublicShell } from "@/components/PublicShell";
import { SimplePageHero } from "@/components/SimplePageHero";
import { showroom, waLink } from "@/lib/showroom";

export default function TentangKamiPage() {
  return (
    <PublicShell>
      <SimplePageHero eyebrow="Tentang Kami" title="Showroom yang membantu Anda membeli mobil dengan lebih yakin." body="Sukses Jaya Mobilindo 2 hadir di Pekanbaru untuk memberikan pengalaman memilih mobil baru dan bekas yang rapi, jelas, dan responsif." />
      <section className="section-y container-pad grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <h2 className="text-4xl font-black">Cerita showroom</h2>
          <p className="mt-5 leading-8 text-coal/70">Kami melayani pelanggan yang menginginkan unit siap pakai, informasi transparan, serta pilihan pembayaran cash, kredit, dan tukar tambah. Setiap interaksi dibuat sederhana: cek kebutuhan, pilih unit, konsultasi pembiayaan, lalu jadwalkan pengecekan langsung.</p>
          <p className="mt-4 leading-8 text-coal/70">Lokasi di koridor Jl. Soekarno-Hatta memudahkan pelanggan Pekanbaru dan sekitar Riau untuk datang langsung, membandingkan unit, dan mendapatkan arahan dari tim showroom.</p>
          <div className="mt-7 flex gap-3">
            <Button href="/katalog">Lihat Katalog</Button>
            <Button href={waLink("Halo, saya ingin konsultasi dengan Sukses Jaya Mobilindo 2.")} variant="secondary">WhatsApp</Button>
          </div>
        </div>
        <div className="grid gap-4">
          {[
            [Star, `Rating ${showroom.rating} dari ${showroom.reviews} ulasan Google`],
            [MapPin, showroom.shortAddress],
            [ShieldCheck, "Informasi unit dan dokumen disampaikan jelas"],
            [Award, "Layanan ramah untuk pembelian pertama maupun upgrade"]
          ].map(([Icon, text]) => (
            <div key={String(text)} className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
              <Icon className="text-redbrand" />
              <p className="mt-4 font-black">{String(text)}</p>
            </div>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
