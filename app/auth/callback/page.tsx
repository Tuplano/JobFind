"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error("No session found or error:", error);
        return;
      }

      // Wait 300ms to let cookies settle before redirect
      setTimeout(() => {
        const role = sessionStorage.getItem("auth_role");

        if (role === "employer") {
          router.push("/employer/setup");
        } else {
          router.push("/employee/setup");
        }
      }, 300);
    };

    handleAuth();
  }, [router]);

  return <p>Processing login...</p>;
}
