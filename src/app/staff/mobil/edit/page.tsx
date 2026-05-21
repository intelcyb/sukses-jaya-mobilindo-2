import { AdminTitle } from "@/components/admin/AdminCards";
import { CarForm } from "@/components/admin/CarForm";
import { StaffShell } from "@/components/admin/StaffShell";

export default function EditCarPage() {
  return (
    <StaffShell>
      <AdminTitle title="Edit Car" body="Edit data unit, gambar saat ini, reorder, delete, dan preview halaman publik." />
      <CarForm mode="edit" />
    </StaffShell>
  );
}
