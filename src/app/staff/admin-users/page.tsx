import { AdminTitle } from "@/components/admin/AdminCards";
import { StaffShell } from "@/components/admin/StaffShell";
import { admins } from "@/lib/admin";

export default function AdminUsersPage() {
  return (
    <StaffShell>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <AdminTitle title="Multi-Admin Users" body="Kelola owner, manager, sales, viewer, status akun, dan ringkasan permission." />
        <button className="touch rounded-panel bg-redbrand px-5 py-3 text-sm font-black text-white">Add Admin</button>
      </div>
      <div className="grid gap-4">
        {admins.map((admin) => (
          <div key={admin.name} className="grid gap-4 rounded-panel border border-ink/10 bg-white p-5 shadow-soft md:grid-cols-[1fr_0.5fr_0.5fr_0.8fr_1fr] md:items-center">
            <div><h2 className="text-xl font-black">{admin.name}</h2><p className="text-sm text-coal/58">{admin.permission}</p></div>
            <select className="field rounded-panel"><option>{admin.role}</option><option>Owner</option><option>Manager</option><option>Sales</option><option>Viewer</option></select>
            <select className="field rounded-panel"><option>{admin.status}</option><option>Active</option><option>Disabled</option></select>
            <p className="text-sm font-bold">{admin.lastLogin}</p>
            <button className="touch rounded-panel border border-ink/10 px-4 text-sm font-bold">Edit Permission</button>
          </div>
        ))}
      </div>
    </StaffShell>
  );
}
