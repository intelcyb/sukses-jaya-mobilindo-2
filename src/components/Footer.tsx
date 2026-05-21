import Link from "next/link";
import { Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { showroom, waLink } from "@/lib/showroom";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-pad grid gap-10 py-12 md:grid-cols-[1.3fr_0.8fr_0.8fr]">
        <div>
          <div className="brightness-0 invert">
            <BrandLogo />
          </div>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/68">
            Showroom mobil baru dan bekas berkualitas di Pekanbaru dengan layanan cash, kredit, tukar tambah, konsultasi unit, dan booking test drive.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Navigasi</h3>
          <div className="mt-4 grid gap-2 text-sm text-white/72">
            {["Katalog", "Layanan", "Simulasi Kredit", "Testimoni", "Kontak"].map((label) => (
              <Link key={label} href={`/${label.toLowerCase().replace(" ", "-")}`} className="hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Showroom</h3>
          <p className="mt-4 text-sm leading-7 text-white/72">{showroom.shortAddress}</p>
          <a href={waLink("Halo Sukses Jaya Mobilindo 2, saya ingin bertanya tentang unit mobil.")} className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white">
            <Phone size={16} /> {showroom.phone}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/45">
        Prototype mock data. Siap dihubungkan ke Supabase pada fase berikutnya.
      </div>
    </footer>
  );
}
