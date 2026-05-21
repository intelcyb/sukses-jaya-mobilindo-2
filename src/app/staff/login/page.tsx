import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";

export default function StaffLoginPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink p-4">
      <div className="w-full max-w-md rounded-panel bg-white p-8 shadow-premium">
        <BrandLogo />
        <h1 className="mt-8 text-3xl font-black">Staff Login</h1>
        <p className="mt-2 text-sm text-coal/58">Mock authentication untuk prototype admin.</p>
        <div className="mt-6 grid gap-3">
          <input className="field rounded-panel" type="email" placeholder="Email staff" />
          <input className="field rounded-panel" type="password" placeholder="Password" />
          <Link href="/staff/dashboard" className="touch inline-flex items-center justify-center rounded-panel bg-redbrand px-5 py-3 text-sm font-black text-white">Login</Link>
          <p className="text-center text-sm font-semibold text-coal/52">Lupa password? Hubungi owner showroom.</p>
        </div>
      </div>
    </main>
  );
}
