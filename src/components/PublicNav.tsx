import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { Button } from "@/components/Button";
import { showroom, waLink } from "@/lib/showroom";

const links = [
  ["Katalog", "/katalog"],
  ["Tentang", "/tentang-kami"],
  ["Layanan", "/layanan"],
  ["Simulasi", "/simulasi-kredit"],
  ["Testimoni", "/testimoni"],
  ["Kontak", "/kontak"]
];

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-pearl/90 backdrop-blur-xl">
      <nav className="container-pad flex h-20 items-center justify-between gap-4">
        <Link href="/" aria-label="Beranda Sukses Jaya Mobilindo 2">
          <BrandLogo />
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {links.map(([label, href]) => (
            <Link key={href} href={href} className="rounded-panel px-3 py-2 text-sm font-semibold text-coal/75 transition hover:bg-white hover:text-redbrand">
              {label}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <Button href={waLink(`Halo ${showroom.name}, saya ingin konsultasi mobil.`)} variant="dark">
            <Phone size={17} className="mr-2" /> WhatsApp
          </Button>
        </div>
        <button className="touch rounded-panel border border-ink/10 bg-white lg:hidden" aria-label="Menu">
          <Menu className="mx-auto" size={22} />
        </button>
      </nav>
    </header>
  );
}
