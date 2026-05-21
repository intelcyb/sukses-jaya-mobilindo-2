import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { PublicShell } from "@/components/PublicShell";
import { SimplePageHero } from "@/components/SimplePageHero";
import { showroom, waLink } from "@/lib/showroom";

export default function KontakPage() {
  return (
    <PublicShell>
      <SimplePageHero eyebrow="Kontak" title="Kunjungi showroom atau hubungi tim kami." body="Atur jadwal cek unit, test drive, konsultasi kredit, atau tukar tambah melalui WhatsApp." />
      <section className="section-y container-pad grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="grid gap-4">
          {[
            [MapPin, showroom.address],
            [Phone, showroom.phone],
            [Clock, showroom.openInfo],
            [MessageCircle, "Konsultasi unit, kredit, tukar tambah, dan test drive"]
          ].map(([Icon, text]) => (
            <div key={String(text)} className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft">
              <Icon className="text-redbrand" />
              <p className="mt-4 font-bold leading-7">{String(text)}</p>
            </div>
          ))}
          <Button href={waLink("Halo Sukses Jaya Mobilindo 2, saya ingin bertanya tentang showroom dan unit mobil.")}>Button to WhatsApp</Button>
        </div>
        <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-premium">
          <h2 className="text-2xl font-black">Form Kontak</h2>
          <div className="mt-5 grid gap-3">
            <input className="field rounded-panel" placeholder="Nama" />
            <input className="field rounded-panel" placeholder="Nomor WhatsApp" />
            <input className="field rounded-panel" placeholder="Kebutuhan: cari mobil, kredit, test drive..." />
            <textarea className="field min-h-32 rounded-panel" placeholder="Pesan" />
            <Button href={waLink("Halo, saya sudah mengisi form kontak dan ingin lanjut konsultasi.")}>Kirim via WhatsApp</Button>
          </div>
          <div className="mt-6 grid min-h-[240px] place-items-center rounded-panel border border-dashed border-ink/20 bg-pearl text-center">
            <div><MapPin className="mx-auto text-redbrand" /><p className="mt-2 font-black">Google Maps Placeholder</p><p className="text-sm text-coal/58">{showroom.shortAddress}</p></div>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
