import EmployeeFooter from "@/components/footers/EmployeeFooter";
import EmployeeHeader from "@/components/headers/EmployeeHeader";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <EmployeeHeader />
      <main className="min-h-screen px-4 py-6">{children}</main>
      <EmployeeFooter />
    </>
  );
}
