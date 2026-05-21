import type { Metadata } from "next";
import { CatalogClient } from "@/components/CatalogClient";
import { PublicShell } from "@/components/PublicShell";

export const metadata: Metadata = {
  title: "Katalog Mobil",
  description: "Katalog mobil baru dan bekas berkualitas di Sukses Jaya Mobilindo 2 Pekanbaru."
};

export default function KatalogPage() {
  return (
    <PublicShell>
      <section className="bg-ink py-16 text-white">
        <div className="container-pad">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">Katalog Mobil</p>
          <h1 className="page-title mt-4 font-black">Pilih unit terbaik dengan filter yang rapi.</h1>
          <p className="mt-5 max-w-2xl text-white/68">Cari berdasarkan brand, model, kategori, harga, transmisi, status unit, dan pilihan featured.</p>
        </div>
      </section>
      <CatalogClient />
    </PublicShell>
  );
}
