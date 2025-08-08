import EmployerFooter from "@/components/footers/EmployerFooter";
import EmployerHeader from "@/components/headers/EmployerHeader";
import { Toaster } from "sonner";

export default function EmployerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <EmployerHeader />
      <main className="min-h-screen px-4 py-6 bg-gray-50">{children}</main>
                 <Toaster richColors position="top-right" />
      <EmployerFooter />
    </>
  );
}
