import { CreditSimulator } from "@/components/CreditSimulator";
import { PublicShell } from "@/components/PublicShell";

export default function SimulasiKreditPage() {
  return (
    <PublicShell>
      <section className="section-y container-pad">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-redbrand">Simulasi Kredit</p>
        <h1 className="page-title mt-4 font-black">Hitung estimasi cicilan mobil.</h1>
        <p className="mt-5 max-w-2xl leading-7 text-coal/68">Gunakan kalkulator sederhana ini sebelum konsultasi dengan tim kami. Semua angka masih estimasi dan akan disesuaikan dengan leasing.</p>
        <div className="mt-8"><CreditSimulator /></div>
      </section>
    </PublicShell>
  );
}
