import { Star } from "lucide-react";
import { Button } from "@/components/Button";
import { PublicShell } from "@/components/PublicShell";
import { SimplePageHero } from "@/components/SimplePageHero";
import { showroom, waLink } from "@/lib/showroom";

const reviews = [
  "Untuk pelayanan di showroom bagus, kualitas bagus, unit juga tidak mengecewakan.",
  "Rekom banget untuk bapak/ibu cari mobil bekas berkualitas.",
  "Bagus, lokasi di tepi jalan besar, mudah ditemukan, pegawai ramah.",
  "Proses tanya jawab cepat dan unit dijelaskan dengan detail.",
  "Showroom nyaman, pilihan mobilnya bagus, tim sales responsif.",
  "Saya dibantu simulasi kredit sampai paham sebelum ambil keputusan."
];

export default function TestimoniPage() {
  return (
    <PublicShell>
      <SimplePageHero eyebrow="Testimoni" title="Kepercayaan pelanggan adalah aset utama showroom." body={`Rating ${showroom.rating} dari ${showroom.reviews} ulasan menjadi bukti pengalaman pelanggan yang positif.`} />
      <section className="section-y container-pad">
        <div className="mb-8 rounded-panel bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div><p className="text-5xl font-black">{showroom.rating}</p><p className="font-bold text-coal/62">{showroom.reviews}+ ulasan Google</p></div>
            <div className="flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} fill="currentColor" />)}</div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote key={review} className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
              <div className="flex gap-1 text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={15} fill="currentColor" />)}</div>
              <p className="mt-5 leading-7 text-coal/72">“{review}”</p>
            </blockquote>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href={waLink("Halo, saya ingin konsultasi mobil setelah melihat testimoni Sukses Jaya Mobilindo 2.")}>Konsultasi via WhatsApp</Button>
        </div>
      </section>
    </PublicShell>
  );
}
