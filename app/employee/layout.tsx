import EmployeeFooter from "@/components/footers/EmployeeFooter";
import EmployeeHeader from "@/components/headers/EmployeeHeader";
import { Toaster } from "sonner";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <EmployeeHeader />
      <main className="min-h-screen py-6 bg-gray-50">{children}</main>
        <Toaster richColors position="top-right" />
      <EmployeeFooter />
    </>
  );
}
