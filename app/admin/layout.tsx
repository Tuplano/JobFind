import AdminHeader from "@/components/headers/AdminHeader";
import AdminFooter from "@/components/footers/AdminFooter";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <AdminHeader />
      <main className="min-h-screen px-6 py-8 bg-white">{children}</main>
      <AdminFooter />
    </>
  );
}
