import { AdminTitle } from "@/components/admin/AdminCards";
import { CarForm } from "@/components/admin/CarForm";
import { StaffShell } from "@/components/admin/StaffShell";

export default function AddCarPage() {
  return (
    <StaffShell>
      <AdminTitle title="Add Car" body="Form lengkap untuk input unit, spesifikasi, status, featured image, dan gallery." />
      <CarForm />
    </StaffShell>
  );
}
