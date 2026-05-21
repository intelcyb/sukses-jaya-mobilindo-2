"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { formatRupiah, waLink } from "@/lib/showroom";

export function CreditSimulator() {
  const [price, setPrice] = useState(300000000);
  const [dp, setDp] = useState(75000000);
  const [tenor, setTenor] = useState(36);
  const [interest, setInterest] = useState(6.5);

  const monthly = useMemo(() => {
    const principal = Math.max(price - dp, 0);
    const totalInterest = principal * (interest / 100) * (tenor / 12);
    return Math.ceil((principal + totalInterest) / tenor);
  }, [price, dp, tenor, interest]);

  const msg = `Halo Sukses Jaya Mobilindo 2, saya ingin konsultasi simulasi kredit. Harga mobil ${formatRupiah(price)}, DP ${formatRupiah(dp)}, tenor ${tenor} bulan.`;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="font-bold">Harga Mobil<input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="field mt-2 rounded-panel font-normal" /></label>
          <label className="font-bold">Down Payment<input type="number" value={dp} onChange={(e) => setDp(Number(e.target.value))} className="field mt-2 rounded-panel font-normal" /></label>
          <label className="font-bold">Tenor<select value={tenor} onChange={(e) => setTenor(Number(e.target.value))} className="field mt-2 rounded-panel font-normal">{[12, 24, 36, 48, 60].map((m) => <option key={m} value={m}>{m} bulan</option>)}</select></label>
          <label className="font-bold">Estimasi Bunga (%)<input type="number" value={interest} onChange={(e) => setInterest(Number(e.target.value))} className="field mt-2 rounded-panel font-normal" /></label>
        </div>
        <button className="touch mt-5 rounded-panel bg-ink px-5 py-3 text-sm font-bold text-white">Hitung Simulasi</button>
      </div>
      <div className="rounded-panel bg-ink p-6 text-white shadow-premium">
        <p className="text-sm text-white/58">Estimasi cicilan per bulan</p>
        <p className="mt-2 text-4xl font-black">{formatRupiah(monthly)}</p>
        <div className="mt-6 grid gap-3 text-sm">
          <div className="flex justify-between border-b border-white/10 pb-3"><span>Total DP</span><b>{formatRupiah(dp)}</b></div>
          <div className="flex justify-between border-b border-white/10 pb-3"><span>Tenor</span><b>{tenor} bulan</b></div>
          <div className="flex justify-between border-b border-white/10 pb-3"><span>Bunga estimasi</span><b>{interest}%</b></div>
        </div>
        <p className="mt-5 text-xs leading-6 text-white/58">Simulasi bersifat estimasi. Angka final mengikuti ketentuan leasing/pembiayaan.</p>
        <Button href={waLink(msg)} className="mt-5 w-full">Konsultasi Simulasi Kredit via WhatsApp</Button>
      </div>
    </div>
  );
}
