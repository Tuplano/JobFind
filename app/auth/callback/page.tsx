"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getSessionAndRedirect = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.error("No session found after OAuth");
        router.push("/auth?error=oauth");
        return;
      }

      // Get role from query string
      const role = searchParams.get("role");
      alert(`Role from query: ${role}`);

      if (role) {
        // Store in user metadata for future logins
        await supabase.auth.updateUser({
          data: { userType: role },
        });

        // Redirect based on role
        if (role === "employer") router.push("/employer/setup");
        else if (role === "employee") router.push("/employee/setup");
        else if (role === "admin") router.push("/admin");
        else router.push("/");
      } else {
        console.warn("No role found in callback URL, sending to home");
        router.push("/");
      }
    };

    getSessionAndRedirect();
  }, [router, searchParams]);

  return <p>Signing you in...</p>;
}
