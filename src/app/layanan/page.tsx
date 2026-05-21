import { CalendarCheck, Car, CreditCard, HandCoins, MessageCircle, RefreshCcw, SearchCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { PublicShell } from "@/components/PublicShell";
import { SimplePageHero } from "@/components/SimplePageHero";
import { waLink } from "@/lib/showroom";

const services = [
  ["Jual Mobil Bekas Berkualitas", Car],
  ["Jual Mobil Baru", Sparkles],
  ["Pembelian Cash", HandCoins],
  ["Pembelian Kredit", CreditCard],
  ["Tukar Tambah", RefreshCcw],
  ["Konsultasi Unit", MessageCircle],
  ["Booking Cek Unit", SearchCheck],
  ["Test Drive", CalendarCheck]
];

export default function LayananPage() {
  return (
    <PublicShell>
      <SimplePageHero eyebrow="Layanan" title="Semua kebutuhan pembelian mobil dalam satu showroom." body="Dari konsultasi unit sampai opsi pembiayaan, tim kami membantu proses pembelian terasa lebih praktis." />
      <section className="section-y container-pad">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(([label, Icon]) => (
            <div key={String(label)} className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-premium">
              <Icon className="text-redbrand" />
              <h2 className="mt-5 text-xl font-black">{String(label)}</h2>
              <p className="mt-3 text-sm leading-6 text-coal/64">Konsultasi jelas, respons cepat, dan proses yang disesuaikan dengan kebutuhan Anda.</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-panel bg-ink p-8 text-white shadow-premium">
          <h2 className="text-3xl font-black">Butuh rekomendasi unit?</h2>
          <p className="mt-3 text-white/68">Ceritakan kebutuhan, budget, dan preferensi Anda. Tim kami bantu shortlist unit yang paling masuk akal.</p>
          <Button href={waLink("Halo Sukses Jaya Mobilindo 2, saya ingin konsultasi rekomendasi unit.")} className="mt-6">Konsultasi WhatsApp</Button>
        </div>
      </section>
    </PublicShell>
  );
}
