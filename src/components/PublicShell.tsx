import { Footer } from "@/components/Footer";
import { PublicNav } from "@/components/PublicNav";
import { showroom, waLink } from "@/lib/showroom";
import { Phone } from "lucide-react";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNav />
      <main className="pb-20 md:pb-0">{children}</main>
      <a
        href={waLink(`Halo ${showroom.name}, saya ingin konsultasi mobil.`)}
        aria-label="Konsultasi WhatsApp"
        className="fixed bottom-4 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-redbrand text-white shadow-premium md:hidden"
      >
        <Phone size={23} />
      </a>
      <Footer />
    </>
  );
}
